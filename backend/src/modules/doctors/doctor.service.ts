import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models";
import { Injectable } from "@nestjs/common";
import { FileService } from "../file";
import { CreateDoctorDto } from "./dtos";
import { UpdateDoctorRequest } from "./interfaces";
import { Op } from "sequelize";

@Injectable()
export class DoctorService {
    constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor, private fileService: FileService) { }

    async getAllDoctors(filters?: {
        speciality?: string;
        minPrice?: number;
        maxPrice?: number;
        rating?: number;
        page?: number;
        limit?: number;
    }): Promise<{ data: Doctor[]; total: number }> {
        const where: any = {};

        if (filters?.speciality) {
            where.speciality = filters.speciality;
        }

        if (filters?.minPrice || filters?.maxPrice) {
            where.consultation_price = {
                ...(filters.minPrice && { [Op.gte]: filters.minPrice }),
                ...(filters.maxPrice && { [Op.lte]: filters.maxPrice }),
            };
        }

        if (filters?.rating) {
            where.rating = { [Op.gte]: filters.rating };
        }

        const page = filters?.page ?? 1;
        const limit = filters?.limit ?? 10;
        const offset = (page - 1) * limit;

        const total = await this.doctorModel.count({ where });

        const data = await this.doctorModel.findAll({
            where,
            limit,
            offset,
        });

        return { data, total };
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

    async updateDoctor(id: number, payload: UpdateDoctorRequest, file?: Express.Multer.File): Promise<{ message: string; updatedDoctor: Doctor }> {
        let newFileName: string | undefined;

        if (file) {
            newFileName = await this.fileService.uploadFile(file);
            const doctor = await this.doctorModel.findOne({ where: { id } });

            if (doctor?.image) {
                await this.fileService.deleteFile(doctor.image);
            }
            payload.image = newFileName;
        }

        await this.doctorModel.update(payload, {
            where: { id },
        });

        const updatedDoctor = await this.doctorModel.findOne({ where: { id } });

        return {
            message: 'Doctor updated successfully',
            updatedDoctor,
        };
    }


    async deleteDoctor(id: number): Promise<{ message: string }> {
        const foundedDoctor = await this.doctorModel.findByPk(id)

        await this.fileService.deleteFile(foundedDoctor.image)
        foundedDoctor.destroy()

        return {
            message: "Doctor deleted successfully"
        }
    }





}