import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users";
import { JwtService } from "@nestjs/jwt";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService, private config: ConfigService) { }

    async Login(payload: LoginRequest): Promise<LoginResponse> {
        const foundedUser = await this.userModel.findOne({
            where: { email: payload.email }
        })

        if (!foundedUser) {
            throw new NotFoundException("User not found!!!")
        }

        const accessToken = await this.jwtService.signAsync(
            {
                id: foundedUser.id,

            },
            {
                expiresIn: this.config.get<number>("jwt.accessTime"),
                secret: this.config.get<string>("jwt.accessKey")
            }
        )

        const refreshToken = await this.jwtService.signAsync(
            {
                id: foundedUser.id
            },
            {
                expiresIn: this.config.get<string>("jwt.refreshTime"),
                secret: this.config.get<string>("jwt.refreshKey")
            }
        )

        return {
            message: "You successfully loged in ✔",
            accessToken,
            refreshToken
        }
    }

    async Register(payload: RegisterRequest): Promise<RegisterResponse> {
        const password = payload.password
        const hashed_password = await bcrypt.hash(password, 10)
        const new_user = await this.userModel.create({ fullname: payload.fullname, email: payload.email, password: hashed_password })

        const accessToken = await this.jwtService.signAsync(
            {
                id: new_user.id,

            },
            {
                expiresIn: this.config.get<number>("jwt.accessTime"),
                secret: this.config.get<string>("jwt.accessKey")
            }
        )

        const refreshToken = await this.jwtService.signAsync(
            {
                id: new_user.id
            },
            {
                expiresIn: this.config.get<string>("jwt.refreshTime"),
                secret: this.config.get<string>("jwt.refreshKey")
            }
        )

        return {
            message: 'you are successfully loged in',
            accessToken,
            refreshToken,
        }
    }
}