import { Injectable } from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import {UserEntity} from "./user.entity"

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

    async findOneByUsername(username: string){
        return await this.userRepository.findOneBy({username: username})
    }

    async create(payload: {username: string, password: string}){
        const new_user = this.userRepository.create(payload)
        return await this.userRepository.save(new_user);
    }
}
