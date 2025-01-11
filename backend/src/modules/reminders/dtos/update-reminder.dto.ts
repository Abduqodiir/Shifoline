import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Matches } from "class-validator";
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

    @ApiProperty({
        description: "Remind at time in DD/MM/YYYY format (e.g., 25/12/2024)",
        type: String,
        example: "25/12/2024",
        required: true,
    })
    @IsString({ message: "Remind at time must be a string" })
    @Matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
        {
            message: "Remind at time must be in DD/MM/YYYY format (e.g., 25/12/2024)"
        }
    )
    remind_at?: string;

    @ApiProperty({ description: "Completion status of the reminder", type: Boolean, required: false })
    @IsOptional()
    @IsBoolean({ message: "Is completed must be a boolean" })
    is_completed?: boolean;
}
