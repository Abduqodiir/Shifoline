import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users";
import { JwtService } from "@nestjs/jwt";
import { ForgotPasswordResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { OtpService } from "../otp";
import { MailerService } from "../mailer";
import { ForgotPasswordDto, ResetPasswordDto } from "./dtos";

@Injectable()
export class AuthService {
    private readonly resetTokenExpiryMinutes = 10;

    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService,
        private config: ConfigService,
        private readonly mailerService: MailerService,
        private readonly otpService: OtpService,
    ) { }   

    private async generateTokens(userId: number): Promise<{ accessToken: string; refreshToken: string }> {
        const accessToken = await this.jwtService.signAsync(
            { id: userId },
            {
                expiresIn: this.config.get<number>("jwt.accessTime"),
                secret: this.config.get<string>("jwt.accessKey"),
            }
        );

        const refreshToken = await this.jwtService.signAsync(
            { id: userId },
            {
                expiresIn: this.config.get<string>("jwt.refreshTime"),
                secret: this.config.get<string>("jwt.refreshKey"),
            }
        );

        return { accessToken, refreshToken };
    }

    async Login(payload: LoginRequest): Promise<LoginResponse> {
        const user = await this.userModel.findOne({ where: { email: payload.email } });

        if (!user) {
            throw new NotFoundException("User not found!");
        }

        const isPasswordValid = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials!");
        }

        const tokens = await this.generateTokens(user.id);

        return {
            message: "You successfully logged in ✔",
            ...tokens,
        };
    }

    async Register(payload: RegisterRequest): Promise<RegisterResponse> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const newUser = await this.userModel.create({
            fullname: payload.fullname,
            email: payload.email,
            password: hashedPassword,
        });

        const tokens = await this.generateTokens(newUser.id);

        return {
            message: "You are successfully registered",
            ...tokens,
        };
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<ForgotPasswordResponse> {
        const { email } = forgotPasswordDto;

        // Check if user exists
        const user = await this.userModel.findOne({ 
            where: { email }
        });
        
        if (!user) {
            throw new BadRequestException('User with this email does not exist');
        }

        // Generate OTP for password reset
        const otpData = this.otpService.generateOtpWithExpiry(this.resetTokenExpiryMinutes);
        this.otpService.storeOtp(email, otpData);

        // Send reset email with OTP
        const subject = 'Password Reset Request';
        await this.mailerService.sendMail(
            user.fullname || 'User',
            email,
            subject,
            otpData.otp
        );

        return {
            success: true,
            message: 'Password reset instructions have been sent to your email',
            resetToken: otpData.otp
        };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ResetPasswordResponse> {
        const { resetToken, newPassword, confirmPassword } = resetPasswordDto;

        if (newPassword !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        let userEmail: string | undefined;
        
        this.otpService.getStoredOtps().forEach((value, email) => {
            if (value.otp === resetToken) {
                userEmail = email;
            }
        });

        if (!userEmail) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }

        // Find the user
        const user = await this.userModel.findOne({
            where: { email: userEmail }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // Validate OTP
        const validationResult = this.otpService.validateOtp(userEmail, resetToken);
        if (!validationResult.valid) {
            throw new UnauthorizedException(validationResult.reason);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password using Sequelize
        await user.update({ 
            password: hashedPassword 
        });

        return {
            success: true,
            message: 'Password has been successfully reset'
        };
    }
}