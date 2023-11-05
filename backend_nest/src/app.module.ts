import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from "@nestjs/typeorm";
import { configs } from "eslint-plugin-prettier";
import { TodoModule } from "./modules/todo/todo.module";
import { TodoEntity } from "./modules/todo/todo.entity";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [TodoEntity],
          synchronize: true,
        }),
        inject: [ConfigService],
      }),
      TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
