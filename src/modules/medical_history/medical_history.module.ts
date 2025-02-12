import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicalHistory } from "./models";
import { MedicalHistoryService } from "./medical_history.service";
import { MedicalHistoryController } from "./medical_history.controller";

@Module({
    imports: [SequelizeModule.forFeature([MedicalHistory])],
    providers: [MedicalHistoryService],
    controllers: [MedicalHistoryController],
})
export class MedicalHistoryModule {}
