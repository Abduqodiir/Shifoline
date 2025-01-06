export declare interface CreateReminderRequest {
    patient_id: number;
    message: string;
    remind_at: Date;
    is_completed?: boolean;
}
