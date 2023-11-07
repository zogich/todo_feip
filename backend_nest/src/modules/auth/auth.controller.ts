import { Body, Controller } from '@nestjs/common';
import {UseGuards, Post, Request, Get} from "@nestjs/common";
import {LocalAuthGuard} from "./local-auth.guard";
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from "../user/user.service";
import { use } from "passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService,
                private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('/signup')
    signUp(@Body() body){
        return this.userService.create(body)
    }

}
