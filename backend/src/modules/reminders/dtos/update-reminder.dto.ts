import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReminderDto {
    @ApiProperty({ description: "Patient ID", type: Number, required: false })
    @IsOptional()
    @IsNumber({}, { message: "Patient ID must be a number" })
    user_id?: number;

    @ApiProperty({ description: "Reminder message", type: String, required: false })
    @IsOptional()
    @IsString({ message: "Message must be a string" })
    message?: string;

    @ApiProperty({ description: "Reminder time in ISO 8601 format", type: Date, required: false })
    @IsOptional()
    @IsDate({ message: "Remind at must be a valid date" })
    remind_at?: Date;

    @ApiProperty({ description: "Completion status of the reminder", type: Boolean, required: false })
    @IsOptional()
    @IsBoolean({ message: "Is completed must be a boolean" })
    is_completed?: boolean;
}
