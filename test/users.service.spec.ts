import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userProviders } from '../src/users/providers/user.providers';
import { DatabaseModule } from '../src/database/database.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UsersService,
        ...userProviders,
        {
          provide: getRepositoryToken(User),
          useClass: class MockRepository extends Repository<User> {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      authStrategy: 'internal',
    };

    // Simula que el correo electrónico ya está en uso
    jest.spyOn(repo, 'save').mockRejectedValue({ code: 'ER_DUP_ENTRY' });

    // Espera que se lance una ConflictException cuando intentes crear un usuario con el mismo correo electrónico
    await expect(service.create(createUserDto)).rejects.toThrowError(
      ConflictException,
    );
  });

  it('should find all users', async () => {
    const usersInDatabase = await service.findAll(); // Obtiene los usuarios de la base de datos
    const numberOfUsersInDatabase = usersInDatabase.length; // Obtiene el número de usuarios en la base de datos

    const users: User[] = Array(numberOfUsersInDatabase).fill(new User()); // Crea usuarios simulados

    jest.spyOn(repo, 'find').mockResolvedValue(users); // Simula la respuesta del repositorio con los usuarios creados

    const returnedUsers = await service.findAll(); // Obtiene los usuarios del servicio

    // Verifica que el número de usuarios devueltos por el servicio sea igual al número de usuarios en la base de datos
    expect(returnedUsers.length).toEqual(numberOfUsersInDatabase);
  });

  it('should find one user', async () => {
    const user: User = new User();
    const uuid = uuidv4();

    // Simula el repositorio
    const mockRepository = {
      findOne: jest.fn().mockResolvedValue(user),
    };

    // Crea una nueva instancia del servicio con el repositorio simulado
    const service = new UsersService(mockRepository as any);

    expect(await service.findOne(uuid)).toEqual(user);
  });

  it('should update a user', async () => {
    const user: User = new User();
    const uuid = uuidv4();

    // Simula el repositorio
    const mockRepository = {
      findOne: jest.fn().mockResolvedValue(user),
      save: jest.fn().mockResolvedValue(user),
    };

    // Crea una nueva instancia del servicio con el repositorio simulado
    const service = new UsersService(mockRepository as any);

    expect(await service.update(uuid, user)).toEqual(user);
  });

  it('should remove a user', async () => {
    const user: User = new User();
    const uuid = uuidv4();

    // Simula el repositorio
    const mockRepository = {
      findOne: jest.fn().mockResolvedValue(user),
      remove: jest.fn().mockResolvedValue(user),
    };

    // Crea una nueva instancia del servicio con el repositorio simulado
    const service = new UsersService(mockRepository as any);

    expect(await service.remove(uuid)).toEqual({
      message: 'Usuario eliminado',
    });
  });
});
