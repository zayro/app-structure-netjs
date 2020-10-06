import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { StaticModule } from './static/static.module';

import * as csurf from 'csurf';

import * as rateLimit from 'express-rate-limit';

import * as helmet from 'helmet';

import * as compression from 'compression';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

//import { Transport, MicroserviceOptions } from '@nestjs/microservices';

//import { NestExpressApplication } from '@nestjs/platform-express';

import configuration from './conf/configuration';


async function bootstrap() {


  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const configService = app.get(configuration);


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
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api/v1/');

  await app.listen(8000);

  console.log(`Application is running on: ${await app.getUrl()}`);


  /**
   * MICROSERVICE
   */

  const staticService = await NestFactory.create(StaticModule,  {  });  
  //await static.listen(7000);
  await staticService.listen(7000);

}
bootstrap();
