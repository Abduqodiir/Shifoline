import { Body, Controller, Delete, Get, NotFoundException, Param, Put } from "@nestjs/common";
import { ConsultationService } from "./consultation.service";
import { Consultation } from "./models";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateConsultationDto } from "./dtos";

@ApiTags("Consultations")
@Controller('consultations')
export class ConsultationController {
    #_service: ConsultationService;

    constructor(service: ConsultationService) { this.#_service = service }

    @Get()
    @ApiOperation({ summary: "Hamma consultatsiyalarni olish" })
    async getAllConsultations(): Promise<Consultation[]> {
        return await this.#_service.getAllConsultations()
    }

    @ApiOperation({ summary: "Yagona consultatsiyani olish" })
    @Get('/:id')
    async getSingleConsultation(id: number): Promise<Consultation> {
        return await this.#_service.getSingleConsultation(id)
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