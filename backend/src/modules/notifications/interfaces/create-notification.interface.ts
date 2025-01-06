export declare interface CreateNotificationRequest {
    user_id: number;
    message: string;
    remind_at: Date;
    is_completed?: boolean;
}
