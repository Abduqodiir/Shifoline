import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models";
import { CreatePaymentDto, UpdatePaymentDto } from "./dtos";
import { Consultation } from "../consultations";
import { Doctor } from "../doctors";
import { User } from "../users";

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentModel: typeof Payment) { }

    async getAllPayments(): Promise<Payment[]> {
        return await this.paymentModel.findAll({
            include: [
                {
                    model: Consultation,
                    attributes: ["id", "schedule_time", "payment_status"],
                    include: [
                        { model: Doctor, attributes: ["id", "fullname"] },
                        { model: User, attributes: ["id", "fullname"] }
                    ]
                }
            ]
        });
    }
    
    async getSinglePayment(id: number): Promise<Payment> {
        return await this.paymentModel.findOne({
            where: { id },
            include: [
                {
                    model: Consultation,
                    attributes: ["id", "schedule_time", "payment_status"],
                    include: [
                        { model: Doctor, attributes: ["id", "fullname"] },
                        { model: User, attributes: ["id", "fullname"] }
                    ]
                }
            ]
        });
    }

    async createPayment(payload: CreatePaymentDto): Promise<{ message: string; newPayment: Payment }> {
        const newPayment = await this.paymentModel.create({
            consultation_id: payload.consultation_id,
            amount: payload.amount,
            payment_method: payload.payment_method,
            payment_status: payload.payment_status,
        });
        return {
            message: "Payment created successfully",
            newPayment,
        };
    }

    async updatePayment(id: number, payload: UpdatePaymentDto): Promise<{ message: string; updatedPayment: Payment }> {
        await this.paymentModel.update(payload, { where: { id } });
        const updatedPayment = await this.paymentModel.findOne({ where: { id } });
        if (!updatedPayment) throw new Error(`Payment with ID ${id} not found`);
        return {
            message: "Payment updated successfully",
            updatedPayment,
        };
    }

    async deletePayment(id: number): Promise<boolean> {
        const payment = await this.paymentModel.findByPk(id);
        if (!payment) return false;
        await payment.destroy();
        return true;
    }
}
