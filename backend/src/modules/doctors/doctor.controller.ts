import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { Doctor } from "./models";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDoctorDto } from "./dtos";

@ApiTags("Doctors")
@Controller('doctors')
export class DoctorController {
    #_service: DoctorService;

    constructor(service: DoctorService) { this.#_service = service }

    @ApiOperation({ summary: 'Barcha doktorlarni olish' })
    @Get()
    async getAllDoctors(): Promise<Doctor[]> {
        return this.#_service.getAllDoctors()
    }

    @ApiOperation({ summary: 'Doctorni id orqali olish' })
    @Get("/:id")
    async getSingleDoctor(id: number): Promise<Doctor> {
        return await this.#_service.getSingleDoctor(id)
    }

    @ApiOperation({ summary: 'Doktor yaratish' })
    @ApiConsumes('multipart/form-data')
    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createDoctor(
        @Body() createDoctorPayload: CreateDoctorDto,
        @UploadedFile() image: Express.Multer.File): Promise<{ message: string, new_doctor: CreateDoctorDto }> {
        await this.#_service.createDoctor(createDoctorPayload, image)

        return {
            message: 'Doktor muvaffaqiyatli yaratildi',
            new_doctor: createDoctorPayload
        }
    }
}
