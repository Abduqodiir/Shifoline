import { IsEmail, IsNotEmpty } from "class-validator";
import { ForgotPasswordRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto implements ForgotPasswordRequest {
    @ApiProperty({
            description: "Email (string formatda)",
            type: "string",
            required: true,
            example: "john_old@gmail.com",
        })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}