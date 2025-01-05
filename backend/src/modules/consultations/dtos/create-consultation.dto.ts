import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { CreateConsultationRequest } from "../interfaces";
import { PaymentStatus } from "../models";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConsultationDto implements CreateConsultationRequest {
    @ApiProperty({
        description: "Consultation schedule time in ISO 8601 format (e.g., 2025-01-05T10:00:00Z)",
        type: Date,
        required: true,
    })
    @IsDate({ message: "Schedule time must be a valid date" })
    schedule_time: Date;

    @ApiProperty({
        description: "Prescription details for the consultation",
        type: String,
        example: "Take 1 tablet of Paracetamol twice daily",
        required: true,
    })
    @IsString({ message: "Prescription must be a string" })
    prescription: string;

    @ApiProperty({
        description: "Doctor's recommendations for the patient",
        type: String,
        example: "Rest for 3 days and avoid heavy lifting",
        required: true,
    })
    @IsString({ message: "Recommendations must be a string" })
    recommendations: string;

    @ApiProperty({
        enum: PaymentStatus,
        description: "Payment status of the consultation",
        example: PaymentStatus.incomplete,
        required: false,
    })
    @IsEnum(PaymentStatus, { message: `Payment status must be one of: ${Object.values(PaymentStatus).join(", ")}` })
    payment_status?: PaymentStatus;

    @ApiProperty({
        description: "ID of the doctor handling the consultation",
        type: Number,
        example: 101,
        required: true,
    })
    @IsNumber({}, { message: "Doctor ID must be a number" })
    doctor_id: number;

    @ApiProperty({
        description: "ID of the user receiving the consultation",
        type: Number,
        example: 202,
        required: true,
    })
    @IsNumber({}, { message: "User ID must be a number" })
    user_id: number;
}
