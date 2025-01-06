import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ConsultationService } from "./consultation.service";
import { Consultation } from "./models";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateConsultationDto, UpdateConsultationDto } from "./dtos";

@ApiTags("Consultations")
@Controller('consultations')
export class ConsultationController {
    #_service: ConsultationService;

    constructor(service: ConsultationService) { this.#_service = service }

    @Get()
    @ApiOperation({ summary: "Hamma konsultatsiyalarni olish" })
    async getAllConsultations(): Promise<Consultation[]> {
        return await this.#_service.getAllConsultations();
    }

    @ApiOperation({ summary: "Yagona konsultatsiyani olish" })
    @Get('/:id')
    async getSingleConsultation(@Param('id') id: number): Promise<Consultation> {
        return await this.#_service.getSingleConsultation(id);
    }

    @ApiOperation({ summary: "Create a new consultation" })
    @Post('/add')
    async createConsultation(@Body() CreateConsultationPayload: CreateConsultationDto): Promise<{ message: string; new_consultation: Consultation }> {
        const result = await this.#_service.createConsultation(CreateConsultationPayload);
        return result;
    }

    @ApiOperation({ summary: "Consultatsiyani yangilash" })
    @Put('/:id')
    async updateConsultation(
        @Param('id') id: string,
        @Body() updatedConsultationPayload: UpdateConsultationDto
    ): Promise<{ message: string; updatedConsultation: Consultation }> {
        const result = await this.#_service.updateConsultation(+id, updatedConsultationPayload);

        return {
            message: result.message,
            updatedConsultation: result.updatedConsultation,
        };
    }

    @ApiOperation({ summary: "Consultatsiyani o'chirish" })
    @Delete("/:id")
    async deleteConsultation(@Param('id') id: string): Promise<{ message: string }> {
        const consultation = await this.#_service.deleteConsultation(+id);
        if (!consultation) {
            throw new NotFoundException(`Consultation with ID ${id} not found`);
        }
        return {
            message: "Consultation deleted successfully",
        };
    }

}