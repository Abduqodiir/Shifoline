import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { MeService } from './me.service';
import { PaginationDto } from './dtos';
import { IMeResponse } from './interfaces/me.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from './models';

@Controller('me')
export class MeController {
    constructor(private readonly meService: MeService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Barcha foydalanuvchiga tegishli ma'lumotlarni olish" })
    @Protected(true)
    @Roles([UserRoles.user, UserRoles.admin])
    @Get()
    async getMe(
        @Request() req,
        @Query() paginationDto: PaginationDto
    ): Promise<IMeResponse> {
        return this.meService.getMe(req.user.id, paginationDto);
    }
}