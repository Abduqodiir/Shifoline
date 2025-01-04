import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.use(morgan('tiny'))

  const config = new DocumentBuilder()
    .setTitle('Feane restaurant API')
    .setDescription('The feane API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Uraaa server ${configService.get<number>('appConfig.port')} portda ishlamoqda...`);
  });
}
bootstrap();
