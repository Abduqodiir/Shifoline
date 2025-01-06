import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateReminderRequest } from "../interfaces";

export class CreateReminderDto implements CreateReminderRequest {
    @ApiProperty({ description: "Patient ID", type: Number, required: true })
    @IsNumber({}, { message: "Patient ID must be a number" })
    user_id: number;

    @ApiProperty({ description: "Reminder message", type: String, required: true })
    @IsString({ message: "Message must be a string" })
    message: string;

    @ApiProperty({ description: "Reminder time in ISO 8601 format", type: Date, required: true })
    @IsDate({ message: "Remind at must be a valid date" })
    remind_at: Date;

    @ApiProperty({ description: "Completion status of the reminder", type: Boolean, required: false })
    @IsOptional()
    @IsBoolean({ message: "Is completed must be a boolean" })
    is_completed?: boolean;
}
