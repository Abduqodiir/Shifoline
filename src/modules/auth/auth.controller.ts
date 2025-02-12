import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from "./dtos";
import { LoginResponse, RegisterResponse, ForgotPasswordResponse, ResetPasswordResponse } from "./interfaces";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    #_service: AuthService;

    constructor(service: AuthService) {
        this.#_service = service;
    }

    @ApiOperation({ summary: 'Login qilish' })
    @ApiResponse({ status: 200, description: 'Successfully logged in' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Post('/login')
    async Login(@Body() payload: LoginDto): Promise<LoginResponse> {
        return await this.#_service.Login(payload);
    }

    @ApiOperation({ summary: 'Register qilish' })
    @ApiResponse({ status: 201, description: 'Successfully registered' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('/register')
    async signUp(@Body() payload: RegisterDto): Promise<RegisterResponse> {
        return await this.#_service.Register(payload);
    }

    @ApiOperation({ summary: 'Parolni unutdim' })
    @ApiResponse({ status: 200, description: 'Reset instructions sent to email' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Post('/forgot-password')
    async forgotPassword(@Body() payload: ForgotPasswordDto): Promise<ForgotPasswordResponse> {
        return await this.#_service.forgotPassword(payload);
    }

    @ApiOperation({ summary: 'Parolni tiklash' })
    @ApiResponse({ status: 200, description: 'Password successfully reset' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Invalid reset token' })
    @Post('/reset-password')
    async resetPassword(@Body() payload: ResetPasswordDto): Promise<ResetPasswordResponse> {
        return await this.#_service.resetPassword(payload);
    }
}