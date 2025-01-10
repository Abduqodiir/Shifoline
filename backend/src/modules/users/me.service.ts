import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { MedicalHistory } from "../medical_history";
import { Consultation } from "../consultations";
import { Notification } from "../notifications";
import { Doctor } from "../doctors";
import { Op } from "sequelize";
import { PaginationDto } from "./dtos"; 
import { IMeResponse } from "./interfaces/me.interface";

@Injectable()
export class MeService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(MedicalHistory) private medicalHistoryModel: typeof MedicalHistory,
        @InjectModel(Notification) private notificationModel: typeof Notification,
    ) { }

    async getMe(userId: number, paginationDto?: PaginationDto): Promise<IMeResponse> {
        const { page = 1, limit = 10 } = paginationDto || {};
        const offset = (page - 1) * limit;
        const currentDate = new Date();

        try {
            // Get user basic info
            const user = await this.userModel.findByPk(userId, {
                attributes: ['id', 'fullname', 'email', 'phone_number', 'image']
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            // Get paginated medical history
            const medicalHistories = await this.medicalHistoryModel.findAll({
                where: { user_id: userId },
                include: [{
                    model: Doctor,
                    attributes: ['full_name']
                }],
                limit,
                offset,
                order: [['diagnosis_date', 'DESC']],
                attributes: ['id', 'condition_name', 'diagnosis_date', 'treatment_details']
            });

            // Get upcoming consultations (latest 5)
            const consultations = await user.$get('consultations', {
                where: {
                    schedule_time: {
                        [Op.gte]: currentDate
                    }
                },
                include: [{
                    model: Doctor,
                    attributes: ['full_name']
                }],
                limit: 5,
                order: [['schedule_time', 'ASC']],
                attributes: ['id', 'schedule_time', 'payment_status', 'prescription', 'recommendations']
            });

            // Get paginated notifications
            const notifications = await this.notificationModel.findAll({
                where: {
                    user_id: userId,
                    is_completed: false
                },
                limit,
                offset,
                order: [['id', 'DESC']],
                attributes: ['id', 'message', 'remind_at', 'is_completed']
            });

            return {
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    phone_number: user.phone_number,
                    image: user.image
                },
                medical_history: medicalHistories.map(history => ({
                    id: history.id,
                    condition_name: history.condition_name,
                    diagnosis_date: history.diagnosis_date,
                    treatment_details: history.treatment_details,
                    doctor_name: history.doctor?.fullname
                })),
                upcoming_consultations: consultations.map(consultation => ({
                    id: consultation.id,
                    doctor_name: consultation.doctor?.fullname,
                    schedule_time: consultation.schedule_time,
                    payment_status: consultation.payment_status,
                    prescription: consultation.prescription,
                    recommendations: consultation.recommendations
                })),
                notifications: notifications.map(notification => ({
                    id: notification.id,
                    message: notification.message,
                    remind_at: notification.remind_at,
                    is_completed: notification.is_completed
                }))
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to fetch user data: ${error.message}`);
        }
    }
}