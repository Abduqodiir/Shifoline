import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentStatus } from "../models";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateConsultationDto {
    @ApiProperty({
        description: "Updated schedule time in ISO 8601 format (e.g., 2025-01-05T10:00:00Z)",
        type: Date,
        required: false,
    })
    @IsOptional()
    @IsDate({ message: "Schedule time must be a valid date" })
    schedule_time?: Date;

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
        enum: PaymentStatus,
        description: "Updated payment status of the consultation",
        example: PaymentStatus.processing,
        required: false,
    })
    @IsOptional()
    @IsEnum(PaymentStatus, { message: `Payment status must be one of: ${Object.values(PaymentStatus).join(", ")}` })
    payment_status?: PaymentStatus;

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
