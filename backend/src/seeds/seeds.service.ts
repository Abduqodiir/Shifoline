import { User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SeedsService  implements OnModuleInit {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async onModuleInit() {
        await this.seedUsers()
    }

    async seedUsers() : Promise<void> {
        const usersCount = await this.userModel.count()

        if(usersCount == 0) {
            await this.userModel.create({
                fullname: "Abduqodir Yuldashev",
                email: "abduqodiir@gmail.com",
                phone_number: "+998770407113",
                role: UserRoles.admin
            })
        }
    }
}