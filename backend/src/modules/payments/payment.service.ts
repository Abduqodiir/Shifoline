import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models";
import { CreatePaymentDto, UpdatePaymentDto } from "./dtos";

@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

    async getAllPayments(): Promise<Payment[]> {
        return await this.paymentModel.findAll();
    }

    async getSinglePayment(id: number): Promise<Payment> {
        return await this.paymentModel.findOne({ where: { id } });
    }

    async createPayment(payload: CreatePaymentDto): Promise<{ message: string; newPayment: Payment }> {
        const newPayment = await this.paymentModel.create(payload);
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
