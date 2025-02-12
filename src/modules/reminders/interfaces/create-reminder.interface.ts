export declare interface CreateReminderRequest {
    user_id: number;
    message: string;
    remind_at: string;
    is_completed?: boolean;
}
