import { Controller, Get, Body, Post, Param, Delete, Query } from '@nestjs/common';
import { TodoEntity } from "./todo.entity";
import { TodoService } from "./todo.service";

@Controller('api/todo')
export class TodoController {

  constructor(private readonly TodoService: TodoService) {
  }

  //Why do i cant write this after :id routes
  @Get('/byparent')
  getByParent(@Query('parent_id') parent_id: string) : Promise<TodoEntity[]> {
    return this.TodoService.findByParentId(parseInt(parent_id))
  }

  @Get()
  getAllTodo(): Promise<TodoEntity[]> {
    return this.TodoService.findAll()
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) : Promise<TodoEntity | null>{
    return this.TodoService.findOne(parseInt(id))
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string) : Promise<void>{
    return this.TodoService.remove(parseInt(id))
  }


  @Post()
  createTodo(@Body() todo: TodoEntity): Promise<TodoEntity> {
      return this.TodoService.create(todo)
  }

}
