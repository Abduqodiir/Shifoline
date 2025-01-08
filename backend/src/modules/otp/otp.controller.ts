import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpCreateDto, OtpValidateDto } from './dtos'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
    
    constructor(private readonly otpService: OtpService) { }

    @Post('generate')
    generateOtp(@Body() otpCreateDto: OtpCreateDto) {
        const otpData = this.otpService.generateOtpWithExpiry(10);
        this.otpService.storeOtp(otpCreateDto.email, otpData);
        return { message: 'OTP created and sent', otp: otpData.otp };
    }

    @Post('validate')
    validateOtp(@Body() otpValidateDto: OtpValidateDto) {
        const validationResult = this.otpService.validateOtp(
            otpValidateDto.email,
            otpValidateDto.otp,
        );

        if (!validationResult.valid) {
            return { message: validationResult.reason };
        }
        return { message: 'OTP is valid' };
    }

}