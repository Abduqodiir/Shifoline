import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { Doctor } from "./models";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDoctorDto, UpdateDoctorDto } from "./dtos";

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
