import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDoctorReviewDto {
    @ApiProperty({ description: "ID of the doctor", example: 101, required: false })
    @IsOptional()
    @IsNumber({}, { message: "Doctor ID must be a number" })
    doctor_id?: number;

    @ApiProperty({ description: "ID of the patient", example: 202, required: false })
    @IsOptional()
    @IsNumber({}, { message: "Patient ID must be a number" })
    user_id?: number;

    @ApiProperty({ description: "Rating between 1 and 5", example: 4, required: false })
    @IsOptional()
    @IsInt({ message: "Rating must be an integer" })
    @Min(1, { message: "Rating must be at least 1" })
    @Max(5, { message: "Rating cannot be more than 5" })
    rating?: number;

    @ApiProperty({ description: "Optional review text", example: "Excellent service!", required: false })
    @IsOptional()
    @IsString({ message: "Review text must be a string" })
    review_text?: string;
}
