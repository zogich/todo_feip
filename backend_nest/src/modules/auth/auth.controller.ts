import { Body, Controller } from '@nestjs/common';
import {UseGuards, Post, Request, Get} from "@nestjs/common";
import {LocalAuthGuard} from "./local-auth.guard";
import { JwtAuthGuard } from './jwt-auth.guard';
import {RefreshJwtGuard} from "./refresh-jwt.guard";
import { UserService } from "../user/user.service";
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
    @Get('/profile')
    getProfile(@Request() req) {
        return this.userService.getProfile(req.user.username)
    }

    @Post('/signup')
    signUp(@Body() body){
        return this.userService.create(body)
    }

    @Post('/verify')
    verify(@Body() body){
        return this.authService.verifyToken(body.token)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('/refresh')
    refresh(@Request() req){
        return this.authService.refresh(req.user)
    }


    @UseGuards(RefreshJwtGuard)
    @Post('/blacklist')
    blacklist(@Body() body){
        return
    }
}
