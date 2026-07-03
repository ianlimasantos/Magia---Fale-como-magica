import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost',
      'capacitor://localhost',
      'http://192.168.1.40:8100',
      process.env.CORS_ORIGIN,
    ], 
    credentials: true
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Magia API')
    .setDescription('Endoints of Magia App - Learning Spanish')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  
}

bootstrap();
