import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from "@nestjs/typeorm";
import { configs } from "eslint-plugin-prettier";
import { TodoEntity } from "./todo.entity";
import { TodoController } from "./todo.controller"
import { TodoService } from "./todo.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
