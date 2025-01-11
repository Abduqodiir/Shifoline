import { ConsultationPaymentStatus } from "../models";

export declare interface CreateConsultationRequest {
    schedule_time: string;
    prescription: string;
    recommendations: string;
    payment_status?: ConsultationPaymentStatus;
    doctor_id: number;
    user_id: number;
}