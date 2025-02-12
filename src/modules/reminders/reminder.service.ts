import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Reminder } from "./models";
import { CreateReminderDto, UpdateReminderDto } from "./dtos";
import { User } from "../users";

@Injectable()
export class ReminderService {
    constructor(@InjectModel(Reminder) private reminderModel: typeof Reminder) { }

    async getAllReminders(): Promise<Reminder[]> {
        return await this.reminderModel.findAll({
            include: [
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }
    
    async getSingleReminder(id: number): Promise<Reminder> {
        return await this.reminderModel.findOne({
            where: { id },
            include: [
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }

    async createReminder(payload: CreateReminderDto): Promise<{ message: string; newReminder: Reminder }> {
        const newReminder = await this.reminderModel.create({
            user_id: payload.user_id,
            message: payload.message,
            remind_at: payload.remind_at,
            is_completed: payload.is_completed,
        });
        return {
            message: "Reminder created successfully",
            newReminder,
        };
    }

    async updateReminder(id: number, payload: UpdateReminderDto): Promise<{ message: string; updatedReminder: Reminder }> {
        await this.reminderModel.update(payload, { where: { id } });
        const updatedReminder = await this.reminderModel.findOne({ where: { id } });
        if (!updatedReminder) throw new Error(`Reminder with ID ${id} not found`);
        return {
            message: "Reminder updated successfully",
            updatedReminder,
        };
    }

    async deleteReminder(id: number): Promise<boolean> {
        const reminder = await this.reminderModel.findByPk(id);
        if (!reminder) return false;
        await reminder.destroy();
        return true;
    }
}
