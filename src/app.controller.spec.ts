import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController', () => {
  let http: INestApplication;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    http =  app.createNestApplication();
    await http.init();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });


  describe('Response', () => {
    it(`/GET `, () => {
      return request(http.getHttpServer())
        .get('/')
        .expect(200)
    })

    });

    afterAll(async () => {
      await http.close();
    });


  });
