import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { NotificationService } from "./notification.service";
import { Notification } from "./models";
import { CreateNotificationDto, UpdateNotificationDto } from "./dtos";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationController {
    constructor(private readonly service: NotificationService) {}

    @Get()
    @ApiOperation({ summary: "Get all notifications" })
    async getAllNotifications(): Promise<Notification[]> {
        return this.service.getAllNotifications();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single notification by ID" })
    async getSingleNotification(@Param("id") id: string): Promise<Notification> {
        return this.service.getSingleNotification(+id);
    }

    @Post()
    @ApiOperation({ summary: "Create a new notification" })
    async createNotification(@Body() payload: CreateNotificationDto) {
        return this.service.createNotification(payload);
    }

    @Put("/:id")
    @ApiOperation({ summary: "Update a notification by ID" })
    async updateNotification(@Param("id") id: string, @Body() payload: UpdateNotificationDto) {
        return this.service.updateNotification(+id, payload);
    }

    @Delete("/:id")
    @ApiOperation({ summary: "Delete a notification by ID" })
    async deleteNotification(@Param("id") id: string) {
        const deleted = await this.service.deleteNotification(+id);
        if (!deleted) throw new NotFoundException(`Notification with ID ${id} not found`);
        return { message: "Notification deleted successfully" };
    }
}
