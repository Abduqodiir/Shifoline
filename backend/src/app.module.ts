import { appConfig, databaseConfig } from '@config';
import { Doctor, DoctorModule, FileModule, User, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('databaseConfig.host'),
            port: config.get<number>('databaseConfig.port'),
            username: config.get<string>('databaseConfig.user'),
            password: config.get<string>('databaseConfig.password'),
            database: config.get<string>('databaseConfig.dbname'),
            models: [Doctor,User],
            // sync:{force:true},
            synchronize: true,
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.error('Error occurred while connecting to the database', error);
          throw error;
        }
      },
    }),
    DoctorModule,
    UserModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
