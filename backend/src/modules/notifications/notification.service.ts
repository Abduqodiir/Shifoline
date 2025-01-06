import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./models";
import { CreateNotificationDto, UpdateNotificationDto } from "./dtos";

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification) private notificationModel: typeof Notification) { }

    async getAllNotifications(): Promise<Notification[]> {
        return await this.notificationModel.findAll();
    }

    async getSingleNotification(id: number): Promise<Notification> {
        return await this.notificationModel.findOne({ where: { id } });
    }

    async createNotification(payload: CreateNotificationDto): Promise<{ message: string; newNotification: Notification }> {
        const newNotification = await this.notificationModel.create({
            user_id: payload.user_id,
            message: payload.message,
            remind_at:payload.remind_at,
            is_completed: payload.is_completed
        });

        return {
            message: "Notification created successfully",
            newNotification,
        };
    }

    async updateNotification(id: number, payload: UpdateNotificationDto): Promise<{ message: string; updatedNotification: Notification }> {
        await this.notificationModel.update(payload, { where: { id } });
        const updatedNotification = await this.notificationModel.findOne({ where: { id } });
        if (!updatedNotification) throw new Error(`Notification with ID ${id} not found`);
        return {
            message: "Notification updated successfully",
            updatedNotification,
        };
    }

    async deleteNotification(id: number): Promise<boolean> {
        const notification = await this.notificationModel.findByPk(id);
        if (!notification) return false;
        await notification.destroy();
        return true;
    }
}
