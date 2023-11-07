import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { type UpdateResult } from 'typeorm';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  // Why do i cant write this after :id routes
  @Get('/byparent')
  async getByParent(
    @Query('parent_id') parentId: string,
  ): Promise<TodoEntity[]> {
    return await this.TodoService.findByParentId(parseInt(parentId));
  }

  @Get()
  async getAllTodo(): Promise<TodoEntity[]> {
    return await this.TodoService.findRootTasks();
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: string): Promise<TodoEntity | null> {
    return await this.TodoService.findOne(parseInt(id));
  }

  @Delete(':id')
  async deleteOneById(@Param('id') id: string): Promise<void> {
    await this.TodoService.remove(parseInt(id));
  }

  @Patch(':id')
  async updateOneById(@Body() body: TodoEntity): Promise<UpdateResult> {
    return await this.TodoService.updateOne(body);
  }

  @Post()
  async createTodo(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return await this.TodoService.create(todo);
  }
}
