export interface CreateDoctorReviewRequest {
    doctor_id: number;
    patient_id: number;
    rating: number;
    review_text?: string;
}
