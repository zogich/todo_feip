import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type UpdateResult, IsNull } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findRootTasks(): Promise<TodoEntity[]> {
    return await this.todoRepository.findBy({ parentTask: IsNull() });
  }

  async findAllRootTaskByUser(userId: number): Promise<TodoEntity[]> {
    return await this.todoRepository.findBy({
      user: userId,
      parentTask: IsNull(),
    });
  }

  async findByParentAndUser(
    userId: number,
    parentId: number,
  ): Promise<TodoEntity[]> {
    return await this.todoRepository.findBy({
      user: userId,
      parentTask: parentId,
    });
  }

  async findByParentId(parentId: number): Promise<TodoEntity[]> {
    return await this.todoRepository.findBy({ parentTask: parentId });
  }

  async create(data: TodoEntity): Promise<TodoEntity> {
    const todo = this.todoRepository.create(data);
    return await this.todoRepository.save(todo);
  }

  async updateOne(data: TodoEntity): Promise<UpdateResult> {
    const todo = this.todoRepository.create(data);
    return await this.todoRepository.update(todo.id, todo);
  }

  async findOne(id: number): Promise<TodoEntity | null> {
    return await this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
