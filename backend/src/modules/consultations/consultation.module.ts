import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Consultation } from "./models";
import { ConsultationService } from "./consultation.service";
import { ConsultationController } from "./consultation.controller";

@Module({
    imports: [SequelizeModule.forFeature([Consultation])],
    providers: [ConsultationService],
    controllers: [ConsultationController]
})

export class ConsultationModule { }