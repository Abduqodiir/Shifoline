import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reminder } from "./models";
import { ReminderService } from "./reminder.service";
import { ReminderController } from "./reminder.controller";

@Module({
    imports: [SequelizeModule.forFeature([Reminder])],
    providers: [ReminderService],
    controllers: [ReminderController],
})
export class ReminderModule {}
