export declare interface CreateDoctorRequest {
    fullname: string;
    experience_years: number;
    speciality: string;
    consultation_price: number;
    languages: string;
    rating:number;
    email: string;
    phone: string;
    password: string;
    image ?: string;
}