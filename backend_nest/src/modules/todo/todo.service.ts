import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TodoEntity } from './todo.entity';
import {IsNull} from "typeorm"

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  findRootTasks(): Promise<TodoEntity[]> {
    return this.todoRepository.findBy({parentTask:  IsNull()});
  }

  findByParentId(parent_id: number): Promise<TodoEntity[]> {
    return this.todoRepository.findBy({parentTask : parent_id})
  }

  create(data: TodoEntity): Promise<TodoEntity> {
    const todo = this.todoRepository.create(data)
    return this.todoRepository.save(todo)
  }

  updateOne(data: TodoEntity) : Promise<UpdateResult>{
    const todo = this.todoRepository.create(data)
    return this.todoRepository.update(todo.id, todo)
  }

  findOne(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}