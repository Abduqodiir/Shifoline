import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtpCreateDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}