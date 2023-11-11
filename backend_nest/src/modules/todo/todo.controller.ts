import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Query,
  Patch, UseGuards, Request,
} from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { type UpdateResult } from 'typeorm';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { use } from "passport";


@Controller('api/todo')
export class TodoController {
  constructor(private readonly TodoService: TodoService) {}

  // Why do i cant write this after :id routes

  @UseGuards(JwtAuthGuard)
  @Get('/byparent')
  async getByParent(
    @Query('parent_id') parentId: string,
  ): Promise<TodoEntity[]> {
    return await this.TodoService.findByParentId(parseInt(parentId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodo(): Promise<TodoEntity[]> {
    return await this.TodoService.findRootTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byuser')
  async getAllUserTodo(@Query('user_id') user_id): Promise<TodoEntity[]>{
    if (user_id) {
      return await this.TodoService.findAllRootTaskByUser(parseInt(user_id))
    }
    return []
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byuserandparent')
  async getAllUserSubtodo(@Request ()req ,@Query('parent_id') parentId: string): Promise<TodoEntity[]>{
    return await this.TodoService.findByParentAndUser(parseInt(req.user.id), parseInt(parentId))
  }



  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneTodo(@Param('id') id: string): Promise<TodoEntity | null> {
    return await this.TodoService.findOne(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOneById(@Param('id') id: string): Promise<void> {
    await this.TodoService.remove(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOneById(@Body() body: TodoEntity): Promise<UpdateResult> {
    return await this.TodoService.updateOne(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return await this.TodoService.create(todo);
  }
}
