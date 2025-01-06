import { appConfig, databaseConfig } from '@config';
import { Consultation, ConsultationModule, Doctor, DoctorModule, DoctorReview, DoctorReviewModule, FileModule, MedicalHistory, MedicalHistoryModule, Notification, NotificationModule, Payment, PaymentModule, Reminder, ReminderModule, User, UserModule } from '@modules';
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
            models: [Doctor,User,Consultation,DoctorReview,MedicalHistory,Notification,Payment,Reminder],
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
    ConsultationModule,
    DoctorReviewModule,
    MedicalHistoryModule,
    NotificationModule,
    PaymentModule,
    ReminderModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
