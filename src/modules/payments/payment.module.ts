import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./models";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

@Module({
    imports: [SequelizeModule.forFeature([Payment])],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
