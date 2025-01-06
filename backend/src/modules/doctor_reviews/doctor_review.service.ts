import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DoctorReview } from "./models"; 
import { CreateDoctorReviewDto, UpdateDoctorReviewDto } from "./dtos";

@Injectable()
export class DoctorReviewService {
    constructor(@InjectModel(DoctorReview) private reviewModel: typeof DoctorReview) {}

    async getAllReviews(): Promise<DoctorReview[]> {
        return await this.reviewModel.findAll();
    }

    async getSingleReview(id: number): Promise<DoctorReview> {
        return await this.reviewModel.findByPk(id);
    }

    async createReview(payload: CreateDoctorReviewDto): Promise<DoctorReview> {
        return await this.reviewModel.create(payload);
    }

    async updateReview(id: number, payload: UpdateDoctorReviewDto): Promise<DoctorReview> {
        await this.reviewModel.update(payload, { where: { id } });
        return await this.reviewModel.findByPk(id);
    }

    async deleteReview(id: number): Promise<boolean> {
        const review = await this.reviewModel.findByPk(id);
        if (!review) return false;
        await review.destroy();
        return true;
    }
}
