import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(createPostDto.authorId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ relations: ['author'] });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id: id } });

    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;

    // Si necesitas actualizar el authorId, asegúrate de que el nuevo authorId corresponda a un User existente
    if (updatePostDto.authorId) {
      const user = await this.userService.findOne(updatePostDto.authorId);
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      post.authorId = updatePostDto.authorId;
      post.author = Promise.resolve(user);
    }

    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
