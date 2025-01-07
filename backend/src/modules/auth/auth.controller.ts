import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos";
import { LoginResponse } from "./interfaces";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    #_service: AuthService;

    constructor(service:AuthService) { 
        this.#_service = service
    }

    @ApiOperation({ summary: 'Login qilish' })
    @Post('/login')
    async Login(@Body() payload: LoginDto):Promise<LoginResponse> {
        return await this.#_service.Login(payload)
    }
}