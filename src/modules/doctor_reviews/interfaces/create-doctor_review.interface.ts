export interface CreateDoctorReviewRequest {
    doctor_id: number;
    user_id: number;
    rating: number;
    review_text?: string;
}
