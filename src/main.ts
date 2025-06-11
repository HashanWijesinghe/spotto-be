import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  console.log(`Application is running on: ${process.env.HOST ?? 'localhost'}`);
  console.log(
    `Application is running on: ${process.env.NODE_ENV ?? 'development'}`,
  );
}
bootstrap();

// setup swagger
const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('SPOTTO API')
    .setDescription('Simple CRUD API for managing books')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger at /api
};
