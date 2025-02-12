import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreatePaymentRequest } from "../interfaces";
import { PaymentMethod, PaymentStatus } from "../models";

export class CreatePaymentDto implements CreatePaymentRequest {
    @ApiProperty({ description: "Consultation ID", type: Number, required: true })
    @IsNumber({}, { message: "Consultation ID must be a number" })
    consultation_id: number;

    @ApiProperty({ description: "Payment amount", type: Number, required: true })
    @IsNumber({}, { message: "Amount must be a number" })
    amount: number;

    @ApiProperty({ 
        description: "Payment method", 
        enum: PaymentMethod, 
        required: true 
    })
    @IsEnum(PaymentMethod, { message: `Payment method must be one of: ${Object.values(PaymentMethod).join(", ")}` })
    payment_method: PaymentMethod;

    @ApiProperty({ 
        description: "Payment status", 
        enum: PaymentStatus, 
        required: false 
    })
    @IsOptional()
    @IsEnum(PaymentStatus, { message: `Payment status must be one of: ${Object.values(PaymentStatus).join(", ")}` })
    payment_status?: PaymentStatus;
}
