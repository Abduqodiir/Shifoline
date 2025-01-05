import { ApiProperty } from "@nestjs/swagger";
import { CreateDoctorRequest } from "../interfaces";
import { IsEmail, IsNumberString, IsOptional, IsPhoneNumber, IsString ,Length} from "class-validator";

export class UpdateDoctorDto implements Omit<CreateDoctorRequest, 'image'> {
    @ApiProperty({
        type: String,
        required: true,
        example: 'Eshmat',
    })
    @IsString()
    @IsOptional()
    fullname: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 5,
    })
    @IsNumberString()
    @IsOptional()
    experience_years: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Cardiolog',
    })
    @IsString()
    @IsOptional()
    speciality: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 150,
    })
    @IsNumberString()
    @IsOptional()
    consultation_price: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'English, Arabic',
    })
    @IsString()
    @IsOptional()
    languages: string;

    @ApiProperty({
        type: Number,
        required: true,
        example: 5,
    })
    @IsNumberString()
    @IsOptional()
    rating: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'john.doe@gmail.com',
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '+998933211232',
        maxLength: 13,
        minLength: 13
    })
    @IsPhoneNumber("UZ")
    @IsOptional()
    @Length(13, 13)
    phone: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '123456',
    })
    @IsString()
    @IsOptional()
    password: string;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: string;
}