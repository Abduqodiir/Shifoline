import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./models";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";

@Module({
    imports: [SequelizeModule.forFeature([Notification])],
    providers: [NotificationService],
    controllers: [NotificationController],
})
export class NotificationModule {}
