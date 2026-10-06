import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //here await is used to wait for the app to be created before moving on to the next line of code.
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('API for management API ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes( //this is a global pipe that will be applied to all incoming requests. It will validate the incoming request body and query parameters based on the DTOs defined in the application.
    new ValidationPipe({
      whitelist: true, //this will strip any properties that are not defined in the DTOs from the incoming request body and query parameters. This is a security measure to prevent malicious users from sending unexpected data to the server.
      transform: true,//this will automatically transform the incoming request body and query parameters to the types defined in the DTOs. For example, if a property is defined as a number in the DTO, it will be automatically converted to a number from a string in the incoming request.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);//our backend is running on port 3000.
}

await bootstrap();