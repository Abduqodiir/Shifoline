import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { Payment } from "./models";
import { CreatePaymentDto, UpdatePaymentDto } from "./dtos";

@ApiTags("Payments")
@Controller("payments")
export class PaymentController {
    constructor(private readonly service: PaymentService) {}

    @Get()
    @ApiOperation({ summary: "Get all payments" })
    async getAllPayments(): Promise<Payment[]> {
        return this.service.getAllPayments();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single payment by ID" })
    async getSinglePayment(@Param("id") id: string): Promise<Payment> {
        return this.service.getSinglePayment(+id);
    }

    @Post('/add')
    @ApiOperation({ summary: "Create a new payment" })
    async createPayment(@Body() payload: CreatePaymentDto) {
        return this.service.createPayment(payload);
    }

    @Put("/update/:id")
    @ApiOperation({ summary: "Update a payment by ID" })
    async updatePayment(@Param("id") id: string, @Body() payload: UpdatePaymentDto) {
        return this.service.updatePayment(+id, payload);
    }

    @Delete("/delete/:id")
    @ApiOperation({ summary: "Delete a payment by ID" })
    async deletePayment(@Param("id") id: string) {
        const deleted = await this.service.deletePayment(+id);
        if (!deleted) throw new NotFoundException(`Payment with ID ${id} not found`);
        return { message: "Payment deleted successfully" };
    }
}
