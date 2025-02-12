import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorReview } from "./models";
import { DoctorReviewService } from "./doctor_review.service";
import { DoctorReviewController } from "./doctor_review.controller";

@Module({
    imports: [SequelizeModule.forFeature([DoctorReview])],
    providers: [DoctorReviewService],
    controllers: [DoctorReviewController],
})
export class DoctorReviewModule {}
