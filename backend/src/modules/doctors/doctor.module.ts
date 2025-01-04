import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./models";
import { DoctorService } from "./doctor.service";
import { FileService } from "../file";
import { DoctorController } from "./doctor.controller";

@Module({
    imports: [SequelizeModule.forFeature([Doctor])],
    providers: [DoctorService,FileService],
    controllers: [DoctorController],
})

export class DoctorModule {}