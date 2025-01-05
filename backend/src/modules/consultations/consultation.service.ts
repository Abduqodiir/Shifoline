import { Injectable } from "@nestjs/common";
import { Consultation } from "./models";
import { InjectModel } from "@nestjs/sequelize";
import { CreateConsultationDto, UpdateConsultationDto } from "./dtos";
import { UpdateConsultationRequest } from "./interfaces";

@Injectable()
export class ConsultationService {
    constructor(@InjectModel(Consultation) private consultationModel: typeof Consultation) { }

    async getAllConsultations(): Promise<Consultation[]> {
        return await this.consultationModel.findAll()
    }

    async getSingleConsultation(id: number): Promise<Consultation> {
        return await this.consultationModel.findOne({
            where: { id }
        })
    }

    async createConsultation(payload: CreateConsultationDto): Promise<{ message: string, new_consultation }> {
        const new_consultation = await this.consultationModel.create({
            schedule_time: payload.schedule_time,
            prescription: payload.prescription,
            recommendations: payload.recommendations,
            payment_status: payload.payment_status,
            doctor_id: payload.doctor_id,
            user_id: payload.user_id,
        })

        return {
            message: "Consultation create successfully",
            new_consultation
        }
    }

    async updateConsultation(id: number, payload: UpdateConsultationDto): Promise<{ message: string; updatedConsultation: Consultation }> {
        await this.consultationModel.update(payload, { where: { id } });

        const updatedConsultation = await this.consultationModel.findOne({ where: { id } });
        if (!updatedConsultation) {
            throw new Error(`Consultation with ID ${id} not found`);
        }

        return {
            message: "Consultation updated successfully",
            updatedConsultation,
        };
    }


    async deleteConsultation(id: number): Promise<boolean> {
        const consultation = await this.consultationModel.findByPk(id);
        if (!consultation) {
            return false;
        }

        await consultation.destroy();
        return true;
    }

}