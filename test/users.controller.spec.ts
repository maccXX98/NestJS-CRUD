import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UsersController', () => {
  let app: INestApplication;
  const usersService = {
    create: () => 'test user created',
    findAll: () => ['test user'],
    findOne: (id: string) => `found user with id ${id}`,
    update: (id: string) => `updated user with id ${id}`,
    remove: (id: string) => `removed user with id ${id}`,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST create', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'test user', email: 'test@example.com' })
      .expect(201)
      .expect(usersService.create());
  });

  it('/GET users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll());
  });

  it('/GET users/:id', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(usersService.findOne('1'));
  });

  it('/PATCH users/:id', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ name: 'updated user', email: 'updated@example.com' })
      .expect(200)
      .expect(usersService.update('1'));
  });

  it('/DELETE users/:id', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect(usersService.remove('1'));
  });

  afterAll(async () => {
    await app.close();
  });
});
