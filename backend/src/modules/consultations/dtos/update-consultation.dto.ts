import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { ConsultationPaymentStatus } from "../models";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateConsultationDto {
    @ApiProperty({
        description: "Consultation schedule time in DD/MM/YYYY format (e.g., 25/12/2024)",
        type: String,
        example: "25/12/2024",
        required: true,
    })
    @IsString({ message: "Schedule time must be a string" })
    @Matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
        {
            message: "Schedule time must be in DD/MM/YYYY format (e.g., 25/12/2024)"
        }
    )
    schedule_time ?: string;

    @ApiProperty({
        description: "Updated prescription details for the consultation",
        type: String,
        example: "Take 2 tablets of Ibuprofen daily",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "Prescription must be a string" })
    prescription?: string;

    @ApiProperty({
        description: "Updated doctor's recommendations for the patient",
        type: String,
        example: "Drink plenty of water and avoid cold beverages",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "Recommendations must be a string" })
    recommendations?: string;

    @ApiProperty({
        enum: ConsultationPaymentStatus,
        description: "Updated payment status of the consultation",
        example: ConsultationPaymentStatus.processing,
        required: false,
    })
    @IsOptional()
    @IsEnum(ConsultationPaymentStatus, { message: `Payment status must be one of: ${Object.values(ConsultationPaymentStatus).join(", ")}` })
    payment_status?: ConsultationPaymentStatus;

    @ApiProperty({
        description: "Updated ID of the doctor handling the consultation",
        type: Number,
        example: 103,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: "Doctor ID must be a number" })
    doctor_id?: number;

    @ApiProperty({
        description: "Updated ID of the user receiving the consultation",
        type: Number,
        example: 204,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: "User ID must be a number" })
    user_id?: number;
}
