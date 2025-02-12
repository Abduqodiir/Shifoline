import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LoginRequest } from "../interfaces";

export class LoginDto implements LoginRequest {
    @ApiProperty({
        description: "Email (string formatda)",
        type: "string",
        required: true,
        example: "john_old@gmail.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Foydalanuvchi paroli",
        type: "string",
        required: true,
        example: "StrongP@ssw0rd!",
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
