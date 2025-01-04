import { ApiProperty } from "@nestjs/swagger";
import { CreateDoctorRequest } from "../interfaces";
import { IsEmail, IsNumberString, IsOptional, IsPhoneNumber, IsString ,Length} from "class-validator";

export class CreateDoctorDto implements Omit<CreateDoctorRequest, 'image'> {
    @ApiProperty({
        type: String,
        required: true,
        example: 'Eshmat',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 5,
    })
    @IsNumberString()
    experience_years: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Cardiolog',
    })
    @IsString()
    speciality: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 150,
    })
    @IsNumberString()
    consultation_price: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'English, Arabic',
    })
    @IsString()
    languages: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 5,
    })
    @IsNumberString()
    rating: number;

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
    phone: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '123456',
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
}