import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

//in this file, we have defined an AuthController class that handles the login functionality of our application. The controller is decorated with @Controller('auth'), which means that all the routes defined in this controller will be prefixed with /auth.