import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ReminderService } from "./reminder.service";
import { Reminder } from "./models";
import { CreateReminderDto, UpdateReminderDto } from "./dtos";

@ApiTags("Reminders")
@Controller("reminders")
export class ReminderController {
    constructor(private readonly service: ReminderService) {}

    @Get()
    @ApiOperation({ summary: "Get all reminders" })
    async getAllReminders(): Promise<Reminder[]> {
        return this.service.getAllReminders();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single reminder by ID" })
    async getSingleReminder(@Param("id") id: string): Promise<Reminder> {
        return this.service.getSingleReminder(+id);
    }

    @Post()
    @ApiOperation({ summary: "Create a new reminder" })
    async createReminder(@Body() payload: CreateReminderDto) {
        return this.service.createReminder(payload);
    }

    @Put("/:id")
    @ApiOperation({ summary: "Update a reminder by ID" })
    async updateReminder(@Param("id") id: string, @Body() payload: UpdateReminderDto) {
        return this.service.updateReminder(+id, payload);
    }

    @Delete("/:id")
    @ApiOperation({ summary: "Delete a reminder by ID" })
    async deleteReminder(@Param("id") id: string) {
        const deleted = await this.service.deleteReminder(+id);
        if (!deleted) throw new NotFoundException(`Reminder with ID ${id} not found`);
        return { message: "Reminder deleted successfully" };
    }
}
