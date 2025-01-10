import { ApiProperty } from "@nestjs/swagger";
import { CreateUserRequest } from "../interfaces/create-user.interface";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";
import { UserRoles } from "../models";

export class CreateUserDto implements Omit<CreateUserRequest, "image"> {
    @ApiProperty({
        type: String,
        required: true,
        example: 'Eshmat',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'john.doe@gmail.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '+998933211232',
        maxLength: 13,
        minLength: 13
    })
    @IsPhoneNumber("UZ")
    @Length(13, 13)
    @IsOptional()
    phone_number?: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'password123',
    })
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })

    @IsOptional()
    image?: string;

    @ApiProperty({
        enum: UserRoles,
        name: "Role",
        required: false,
    })
    @IsOptional()
    @IsEnum(UserRoles)
    role ?: UserRoles;
}