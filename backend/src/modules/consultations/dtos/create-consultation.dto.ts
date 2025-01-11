import { IsEnum, IsNumber, IsString, Matches } from "class-validator";
import { CreateConsultationRequest } from "../interfaces";
import { ConsultationPaymentStatus } from "../models";
import { ApiProperty } from "@nestjs/swagger";

export class CreateConsultationDto implements CreateConsultationRequest {
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
    schedule_time: string;

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
        enum: ConsultationPaymentStatus,
        description: "Payment status of the consultation",
        example: ConsultationPaymentStatus.incomplete,
        required: false,
    })
    @IsEnum(ConsultationPaymentStatus, { message: `Payment status must be one of: ${Object.values(ConsultationPaymentStatus).join(", ")}` })
    payment_status?: ConsultationPaymentStatus;

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
