import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MedicalHistoryService } from "./medical_history.service";
import { MedicalHistory } from "./models";
import { CreateMedicalHistoryDto, UpdateMedicalHistoryDto } from "./dtos";

@ApiTags("Medical Histories")
@Controller("medical-histories")
export class MedicalHistoryController {
    constructor(private readonly service: MedicalHistoryService) {}

    @Get()
    @ApiOperation({ summary: "Get all medical histories" })
    async getAllMedicalHistories(): Promise<MedicalHistory[]> {
        return this.service.getAllMedicalHistories();
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get a single medical history by ID" })
    async getSingleMedicalHistory(@Param("id") id: string): Promise<MedicalHistory> {
        return this.service.getSingleMedicalHistory(+id);
    }

    @Post('/add')
    @ApiOperation({ summary: "Create a new medical history" })
    async createMedicalHistory(@Body() payload: CreateMedicalHistoryDto) {
        return this.service.createMedicalHistory(payload);
    }

    @Put("/update/:id")
    @ApiOperation({ summary: "Update a medical history by ID" })
    async updateMedicalHistory(@Param("id") id: string, @Body() payload: UpdateMedicalHistoryDto) {
        return this.service.updateMedicalHistory(+id, payload);
    }

    @Delete("/delete/:id")
    @ApiOperation({ summary: "Delete a medical history by ID" })
    async deleteMedicalHistory(@Param("id") id: string) {
        const deleted = await this.service.deleteMedicalHistory(+id);
        if (!deleted) throw new NotFoundException(`Medical history with ID ${id} not found`);
        return { message: "Medical history deleted successfully" };
    }
}
