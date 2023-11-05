import { Controller, Get, Body, Post } from '@nestjs/common';
import { TodoEntity } from "./todo.entity";
import { TodoService } from "./todo.service";

@Controller('api/todo')
export class TodoController {

  constructor(private readonly TodoService: TodoService) {
  }

  @Get()
  getAllTodo(): Promise<TodoEntity[]> {
    return this.TodoService.findAll()
  }

  @Post()
  createTodo(@Body() todo: TodoEntity): Promise<TodoEntity> {
      return this.TodoService.create(todo)
  }
}
