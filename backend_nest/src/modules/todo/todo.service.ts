import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity.ts';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  create(data: TodoEntity): void {
    this.todoRepository.create(data)
  }

  findOne(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}