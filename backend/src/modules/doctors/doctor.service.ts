import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models";
import { Injectable } from "@nestjs/common";
import { FileService } from "../file";
import { CreateDoctorDto } from "./dtos";

@Injectable()
export class DoctorService {
    constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor, private fileService: FileService) { }

    async getAllDoctors(): Promise<Doctor[]> {
        return await this.doctorModel.findAll();
    }

    async getSingleDoctor(id: number): Promise<Doctor> {
        return await this.doctorModel.findOne({
            where: { id }
        })
    }

    async createDoctor(payload: CreateDoctorDto, file: Express.Multer.File): Promise<{ message: string, new_doctor: Doctor }> {
        const image = await this.fileService.uploadFile(file)

        const new_doctor = await this.doctorModel.create({
            fullname: payload.fullname,
            experience_years: payload.experience_years,
            speciality: payload.speciality,
            consultation_price: payload.consultation_price,
            languages: payload.languages,
            rating: payload.rating,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
            image
        })

        return {
            message: 'Doctor created successfully',
            new_doctor
        }
    }
}