import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "../mailer/mailer.module";
import { OtpModule } from "../otp/otp.module";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { 
                    expiresIn: configService.get('JWT_EXPIRATION_TIME') 
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        MailerModule,
        OtpModule
    ],
    providers: [
        AuthService,
        ConfigService
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }