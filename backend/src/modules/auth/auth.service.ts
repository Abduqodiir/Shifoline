import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users";
import { JwtService } from "@nestjs/jwt";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

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
}
