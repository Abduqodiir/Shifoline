export declare interface CreateReminderRequest {
    user_id: number;
    message: string;
    remind_at: Date;
    is_completed?: boolean;
}
