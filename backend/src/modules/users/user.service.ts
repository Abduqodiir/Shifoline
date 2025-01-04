import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { FileService } from "../file";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User,private fileService: FileService) { }

    async getAllUsers():Promise<User[]> {
        return await this.userModel.findAll()
    }

    async getSingleUser(id:number):Promise<User> {
        return await this.userModel.findOne({
            where: {id}
        })
    }
}