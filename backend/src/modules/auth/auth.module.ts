import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [AuthService,JwtService],
    controllers: [AuthController]
})

export  class AuthModule { }