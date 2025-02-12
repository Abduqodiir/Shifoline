import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";
import { UserService } from "./user.service";
import { FileService } from "../file";
import { UserController } from "./user.controller";
import { MedicalHistory } from "../medical_history";
import { Consultation } from "../consultations";
import { Notification } from "../notifications"; 
import { Doctor } from "../doctors";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";

@Module({
    imports: [SequelizeModule.forFeature([User, MedicalHistory,
        Consultation,
        Doctor,
        Notification])],
    providers: [UserService, FileService,MeService],
    controllers: [UserController,MeController]
})

export class UserModule { }