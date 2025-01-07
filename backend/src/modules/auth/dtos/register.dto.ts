import { IsString, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RegisterRequest } from "../interfaces";

export class RegisterDto implements RegisterRequest {
    @ApiProperty({
        description: "Foydalanuvchi to'liq ismi",
        type: "string",
        required: true,
        example: "John Doe",
    })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({
        description: "Foydalanuvchi email manzili",
        type: "string",
        required: true,
        example: "john_doe@gmail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Foydalanuvchi uchun kuchli parol",
        type: "string",
        required: true,
        example: "Str0ng@Passw0rd!",
    })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}
