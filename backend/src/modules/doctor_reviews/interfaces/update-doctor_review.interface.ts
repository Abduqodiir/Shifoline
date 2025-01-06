export interface UpdateDoctorReviewRequest {
    doctor_id?: number;
    patient_id?: number;
    rating?: number;
    review_text?: string;
}
