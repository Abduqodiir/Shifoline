import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DoctorReview } from "./models";
import { CreateDoctorReviewDto, UpdateDoctorReviewDto } from "./dtos";
import { Doctor } from "../doctors";
import { User } from "../users";

@Injectable()
export class DoctorReviewService {
    constructor(@InjectModel(DoctorReview) private reviewModel: typeof DoctorReview) { }

    async getAllDoctorReviews(): Promise<DoctorReview[]> {
        return await this.reviewModel.findAll({
            include: [
                { model: Doctor, attributes: ["id", "fullname", "speciality"] },
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }
    
    async getSingleDoctorReview(id: number): Promise<DoctorReview> {
        return await this.reviewModel.findOne({
            where: { id },
            include: [
                { model: Doctor, attributes: ["id", "fullname", "speciality"] },
                { model: User, attributes: ["id", "fullname", "email"] }
            ]
        });
    }

    async createReview(payload: CreateDoctorReviewDto): Promise<DoctorReview> {
        return await this.reviewModel.create({
            doctor_id: payload.doctor_id,
            user_id: payload.user_id,
            rating: payload.rating,
            review_text: payload.review_text
        });
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
