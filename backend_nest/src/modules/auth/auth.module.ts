import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {LocalStrategy} from "./local.stategy";
import {JwtStrategy} from "./jwt.strategy";
import {RefreshJwtStrategy} from "./refresh-jwt.strategy";

@Module({
   imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
