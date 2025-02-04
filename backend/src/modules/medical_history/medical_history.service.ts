import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalHistory } from "./models"
import { CreateMedicalHistoryDto, UpdateMedicalHistoryDto } from "./dtos";
import { Doctor } from "../doctors";
import { User } from "../users";

@Injectable()
export class MedicalHistoryService {
    constructor(@InjectModel(MedicalHistory) private medicalHistoryModel: typeof MedicalHistory) { }

    async getAllMedicalHistories(): Promise<MedicalHistory[]> {
        return await this.medicalHistoryModel.findAll({
            include: [
                { model: Doctor, attributes: ["id", "fullname", "speciality"] },
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }
    
    async getSingleMedicalHistory(id: number): Promise<MedicalHistory> {
        return await this.medicalHistoryModel.findOne({
            where: { id },
            include: [
                { model: Doctor, attributes: ["id", "fullname", "speciality"] },
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }

    async createMedicalHistory(payload: CreateMedicalHistoryDto): Promise<{ message: string; newMedicalHistory }> {
        const newMedicalHistory = await this.medicalHistoryModel.create({
            user_id: payload.user_id,
            doctor_id: payload.doctor_id,
            treatment_details: payload.treatment_details,
            diagnosis_date: payload.diagnosis_date,
            condition_name: payload.condition_name,
        });
        return {
            message: "Medical history created successfully",
            newMedicalHistory,
        };
    }

    async updateMedicalHistory(id: number, payload: UpdateMedicalHistoryDto): Promise<{ message: string; updatedMedicalHistory }> {
        await this.medicalHistoryModel.update(payload, { where: { id } });
        const updatedMedicalHistory = await this.medicalHistoryModel.findOne({ where: { id } });
        if (!updatedMedicalHistory) throw new Error(`Medical history with ID ${id} not found`);
        return {
            message: "Medical history updated successfully",
            updatedMedicalHistory,
        };
    }

    async deleteMedicalHistory(id: number): Promise<boolean> {
        const medicalHistory = await this.medicalHistoryModel.findByPk(id);
        if (!medicalHistory) return false;
        await medicalHistory.destroy();
        return true;
    }
}
