import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    #_service: UserService;
    constructor(service: UserService) { this.#_service = service }

    @ApiOperation({summary: 'Hamma userlarni olish'})
    @Get()
    async getAllUsers():Promise<User[]> {
        return await this.#_service.getAllUsers();
    }

    @Get('/:id')
    @ApiOperation({summary: 'Yagona userni olish'})
    async getSingleUser(id:number):Promise<User> {
        return await this.#_service.getSingleUser(id);
    }
}