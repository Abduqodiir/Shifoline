import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ResetPasswordRequest } from "../interfaces";

export class ResetPasswordDto implements ResetPasswordRequest{
    @IsString()
    @IsNotEmpty()
    resetToken:string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @IsNumberString()
    confirmPassword?: string;
}