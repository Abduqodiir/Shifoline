import { ConsultationPaymentStatus } from "../models";

export declare interface UpdateConsultationRequest {
    schedule_time?: Date; 
    prescription?: string;
    recommendations?: string;
    payment_status?: ConsultationPaymentStatus;
    doctor_id?: number;
    user_id?: number;
}
    