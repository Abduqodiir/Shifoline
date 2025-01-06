import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMedicalHistoryDto {
    @ApiProperty({ description: "User ID", type: Number, required: false })
    @IsOptional()
    @IsNumber({}, { message: "User ID must be a number" })
    user_id?: number;

    @ApiProperty({ description: "Doctor ID", type: Number, required: false })
    @IsOptional()
    @IsNumber({}, { message: "Doctor ID must be a number" })
    doctor_id?: number;

    @ApiProperty({ description: "Details of the treatment", type: String, required: false })
    @IsOptional()
    @IsString({ message: "Treatment details must be a string" })
    treatment_details?: string;

    @ApiProperty({ description: "Date of diagnosis", type: Date, required: false })
    @IsOptional()
    @IsDate({ message: "Diagnosis date must be a valid date" })
    diagnosis_date?: Date;

    @ApiProperty({ description: "Condition name", type: String, required: false })
    @IsOptional()
    @IsString({ message: "Condition name must be a string" })
    condition_name?: string;
}
