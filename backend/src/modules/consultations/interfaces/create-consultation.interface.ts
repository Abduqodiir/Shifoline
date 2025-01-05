import { PaymentStatus } from "../models";

export declare interface CreateConsultationRequest {
    schedule_time: Date;
    prescription: string;
    recommendations: string;
    payment_status?: PaymentStatus;
    doctor_id: number;
    user_id: number;
}