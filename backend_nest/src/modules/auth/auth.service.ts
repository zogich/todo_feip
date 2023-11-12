import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user != null && user?.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access: this.jwtService.sign(payload),
      refresh: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async refresh(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access: this.jwtService.sign(payload),
    };
  }

  // BlacklistToken
}
