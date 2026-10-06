import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import * as bcrypt from 'bcrypt';
  
  import { UsersService } from '../users/users.service.js';
  import { LoginDto } from './dto/login.dto.js';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
      ) {}
  
    async login(loginDto: LoginDto) {
      const user = await this.usersService.findByEmail(loginDto.email);
  
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
  
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }
  
      console.log('JWT SECRET:', process.env.JWT_SECRET);
      const payload = {
        sub: user.id,
        email: user.email,
      };
      
      const accessToken = this.jwtService.sign(payload);
      
      return {
        access_token: accessToken,
      };
  }
}