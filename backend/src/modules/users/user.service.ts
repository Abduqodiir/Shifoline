import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { FileService } from "../file";
import { CreateUserDto } from "./dtos";
import { Multer } from "multer";
import { UpdateUserRequest } from "./interfaces";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, private fileService: FileService) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll()
    }

    async getSingleUser(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: { id }
        })
    }

    async createUser(payload: CreateUserDto, file: Express.Multer.File): Promise<{ message: string, new_user: User }> {
        const image = await this.fileService.uploadFile(file)

        const new_user = await this.userModel.create({
            fullname: payload.fullname,
            email: payload.email,
            phone_number: payload.phone_number,
            password: payload.password,
            image
        })

        return {
            message: 'User created successfully',
            new_user
        }
    }

    async updateUser(id: number, payload: UpdateUserRequest, file?: Express.Multer.File): Promise<{ message: string, updatedUser: User }> {
        let newFileName: string | undefined;

        if (file) {
            newFileName = await this.fileService.uploadFile(file);
            const user = await this.userModel.findOne({ where: { id } });
            if (user?.image) {
                await this.fileService.deleteFile(user.image);
            }
            payload.image = newFileName;
        }

        await this.userModel.update(payload, {
            where: { id }
        })

        const updatedUser = await this.userModel.findOne({ where: { id } });

        return {
            message: 'User updated successfully',
            updatedUser,
        };
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        const foundedUser = await this.userModel.findByPk(id)

        await this.fileService.deleteFile(foundedUser.image)
        foundedUser.destroy()

        return {
            message: 'User deleted successfully'
        }
    }
}