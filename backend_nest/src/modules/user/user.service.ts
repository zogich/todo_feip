import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async getProfile(username: string) {
    const response = await this.userRepository.findOneBy({
      username,
    });
    return { id: response?.id, username: response?.username };
  }

  async create(payload: { username: string; password: string }) {
    const existUser = await this.userRepository.findOneBy({
      username: payload.username,
    });
    if (existUser != null) {
      throw new BadRequestException('USERNAME ALREADY EXISTS');
    }
    const newUser = this.userRepository.create(payload);
    return await this.userRepository.save(newUser);
  }
}
