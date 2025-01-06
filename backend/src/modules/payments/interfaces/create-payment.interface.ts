import { PaymentMethod, PaymentStatus } from "../models";

export declare interface CreatePaymentRequest {
    consultation_id: number;
    amount: number;
    payment_method: PaymentMethod;
    payment_status?: PaymentStatus;
}
