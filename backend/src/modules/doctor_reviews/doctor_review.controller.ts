import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DoctorReviewService } from "./doctor_review.service";
import { DoctorReview } from "./models";
import { CreateDoctorReviewDto, UpdateDoctorReviewDto } from "./dtos";

@Controller('doctor-reviews')
export class DoctorReviewController {
    constructor(private readonly reviewService: DoctorReviewService) {}

    @Get()
    async getAllReviews(): Promise<DoctorReview[]> {
        return await this.reviewService.getAllDoctorReviews();
    }

    @Get('/:id')
    async getSingleReview(@Param('id') id: number): Promise<DoctorReview> {
        return await this.reviewService.getSingleDoctorReview   (+id);
    }

    @Post()
    async createReview(@Body() payload: CreateDoctorReviewDto): Promise<DoctorReview> {
        return await this.reviewService.createReview(payload);
    }

    @Put('/:id')
    async updateReview(@Param('id') id: number, @Body() payload: UpdateDoctorReviewDto): Promise<DoctorReview> {
        return await this.reviewService.updateReview(+id, payload);
    }

    @Delete('/:id')
    async deleteReview(@Param('id') id: number): Promise<{ message: string }> {
        const deleted = await this.reviewService.deleteReview(+id);
        if (!deleted) throw new Error(`Review with ID ${id} not found`);
        return { message: "Review deleted successfully" };
    }
}
