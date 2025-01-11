import { IsDate, IsNumber, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateMedicalHistoryRequest } from "../interfaces";

export class CreateMedicalHistoryDto implements CreateMedicalHistoryRequest {
    @ApiProperty({ description: "User ID", type: Number, required: true })
    @IsNumber({}, { message: "User ID must be a number" })
    user_id: number;

    @ApiProperty({ description: "Doctor ID", type: Number, required: true })
    @IsNumber({}, { message: "Doctor ID must be a number" })
    doctor_id: number;

    @ApiProperty({ description: "Details of the treatment", type: String, required: true })
    @IsString({ message: "Treatment details must be a string" })
    treatment_details: string;

    @ApiProperty({
        description: "Diagnosis time in DD/MM/YYYY format (e.g., 25/12/2024)",
        type: String,
        example: "25/12/2024",
        required: true,
    })
    @IsString({ message: "Diagnosis time must be a string" })
    @Matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
        {
            message: "Diagnosis time must be in DD/MM/YYYY format (e.g., 25/12/2024)"
        }
    )
    diagnosis_date: string;

    @ApiProperty({ description: "Condition name", type: String, required: true })
    @IsString({ message: "Condition name must be a string" })
    condition_name: string;
}
