import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  app.useGlobalPipes(validationPipe);

  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  console.log(`🚀 Server is running at ${url} 🚀`);
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

// validation pipe
const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});
