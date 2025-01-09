import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { Doctor } from "./models";
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDoctorDto, UpdateDoctorDto } from "./dtos";

@ApiTags("Doctors")
@Controller('doctors')
export class DoctorController {
    #_service: DoctorService;

    constructor(service: DoctorService) { this.#_service = service }

    @ApiOperation({ summary: 'Doktorlarni filtrlash va sahifalash' })
    @ApiQuery({ name: 'speciality', required: false, description: 'Doktorning sohasi' })
    @ApiQuery({ name: 'minPrice', required: false, description: 'Minimal narx (konsultatsiya uchun)' })
    @ApiQuery({ name: 'maxPrice', required: false, description: 'Maksimal narx (konsultatsiya uchun)' })
    @ApiQuery({ name: 'rating', required: false, description: 'Doktorning reytingi' })
    @ApiQuery({ name: 'page', required: false, description: 'Qaysi sahifa (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, description: 'Har sahifadagi yozuvlar soni (default: 10)' })
    @Get()
    async getAllDoctors(
        @Query('speciality') speciality?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('rating') rating?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ): Promise<{ data: Doctor[]; total: number }> {
        const filters = {
            speciality,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            rating: rating ? parseFloat(rating) : undefined,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
        };
        return await this.#_service.getAllDoctors(filters);
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

    @ApiOperation({ summary: 'Doktorni yangilash' })
    @ApiConsumes('multipart/form-data')
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image')) 
    async updateDoctor(
        @Param('id') id: string,
        @Body() updateDoktorPayload: UpdateDoctorDto,
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<{ message: string; updatedDoctor: Doctor }> {
        const result = await this.#_service.updateDoctor(+id, updateDoktorPayload, file);
        return {
            message: 'Doktor muvaffaqiyatli yangilandi',
            updatedDoctor: result.updatedDoctor,
        };
    }


    @ApiOperation({ summary: "Doktorni o'chirish" })
    @Delete('/:id')
    @UseInterceptors(FileInterceptor('image'))
    async deleteDoctor(@Param('id') id: string): Promise<{ message: string }> {
        return this.#_service.deleteDoctor(+id)
    }
    
}
