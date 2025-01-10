export interface IMedicalHistory {
    id: number;
    condition_name: string;
    diagnosis_date: Date;
    treatment_details: string;
    doctor_name: string;
}

export interface IConsultation {
    id: number;
    doctor_name: string;
    schedule_time: Date;
    payment_status: string;
    prescription: string;
    recommendations: string;
}

export interface INotification {
    id: number;
    message: string;
    remind_at: Date;
    is_completed: boolean;
}

export interface IUser {
    id: number;
    fullname: string;
    email: string;
    phone_number: string;
    image: string;
}

export interface IMeResponse {
    user: IUser;
    medical_history: IMedicalHistory[];
    upcoming_consultations: IConsultation[];
    notifications: INotification[];
}