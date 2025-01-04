import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto, UpdateUserDto } from "./dtos";

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

    @ApiOperation({summary: 'Yagona userlarni olish'})
    @Get('/:id')
    @ApiOperation({summary: 'Yagona userni olish'})
    async getSingleUser(id:number):Promise<User> {
        return await this.#_service.getSingleUser(id);
    }

    @ApiOperation({summary: "Userni creat qilish"})
    @ApiConsumes('multipart/form-data')
    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    async createUser(@Body() createUserPayload: CreateUserDto,
    @UploadedFile() image:Express.Multer.File):Promise<{message:string,new_user:CreateUserDto}> {
        await this.#_service.createUser(createUserPayload,image)
        return {
            message: "User created successfully",
            new_user: createUserPayload
        }
    }

    @ApiOperation({summary: "Userni yangilash"})
    @ApiConsumes('multipart/form-data')
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(@Param('id') id:string, @Body() updateUserPayload: UpdateUserDto, @UploadedFile() file?: Express.Multer.File): Promise<{message:string,updatedUser:User}>{
        const result = await this.#_service.updateUser(+id,updateUserPayload,file)
        
        return {
            message: "User updated successfully",
            updatedUser: result.updatedUser
        }
    }

    @ApiOperation({summary: "Userni o'chirish"})
    @Delete('/:id')
    @UseInterceptors(FileInterceptor('image'))
    async deleteUser(@Param('id') id:string):Promise<{message:string}> {
        return this.#_service.deleteUser(+id)
    }
}
