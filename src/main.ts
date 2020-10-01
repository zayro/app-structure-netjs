import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as csurf from 'csurf';

import * as rateLimit from 'express-rate-limit';

import * as helmet from 'helmet';

import * as compression from 'compression';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


import * as cookieParser from 'cookie-parser';


async function bootstrap() {


  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  // allow all cors
  app.enableCors();

  // security with request Http
  app.use(helmet());

  app.use(cookieParser());

  // security about malicious exploit of a website where unauthorized
  /* setup route middlewares
  var csrfProtection = csurf({ cookie: true })
  // parse cookies
  // we need this because "cookie" is true in csrfProtection
  app.use(cookieParser())
  //app.use(csurf());
  */

  // somewhere in your initialization file
  app.use(compression());

  // security about request per minutes
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );


  // Documentarion Swagger
  const options = new DocumentBuilder()
    .setTitle('Api - Document')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
