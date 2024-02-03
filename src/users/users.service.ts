import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    // Convertir el nombre a minúsculas
    user.userName = user.userName.toLowerCase();

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // error code for unique_violation in MySQL
        throw new ConflictException('El correo electrónico ya está en uso.');
      }
      throw error;
    }

    return user;
  }

  async findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'user.createdAt',
        'user.authStrategy',
      ])
      .getMany();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Convertir el nombre a minúsculas
    if (updateUserDto.userName) {
      user.userName = updateUserDto.userName.toLowerCase();
    }

    // Cifrar la contraseña
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    // Actualizar otros campos
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.authStrategy) {
      user.authStrategy = updateUserDto.authStrategy;
    }

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // error code for unique_violation in MySQL
        throw new ConflictException('El correo electrónico ya está en uso.');
      }
      throw error;
    }

    return user;
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (!userToRemove) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.remove(userToRemove);
    return { message: 'Usuario eliminado' };
  }

  async createProfile(id: string, profile: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;

    return this.userRepository.save(user);
  }
}
