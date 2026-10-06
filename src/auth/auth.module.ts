import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
    imports: [
      UsersModule,
  
      ConfigModule,
  
      JwtModule.registerAsync({//registerAsync allows us to configure the JwtModule asynchronously, which is useful when we need to use a service (like ConfigService) to get the configuration values.
        imports: [ConfigModule],
        inject: [ConfigService],
  
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        }),
      }),
    ],
  
    controllers: [AuthController],
  
    providers: [
      AuthService,
      JwtAuthGuard,
    ],
  
    exports: [
      JwtAuthGuard,
      JwtModule,
    ],
  })
  export class AuthModule {}

  // In this file, we have defined an AuthModule class that imports the UsersModule, ConfigModule, and JwtModule.
  // The JwtModule is configured asynchronously using the registerAsync method, which allows us to use the ConfigService to get the JWT_SECRET from the environment variables. 
  //The AuthController and AuthService are also provided in this module, along with the JwtAuthGuard. Finally, we export the JwtAuthGuard and JwtModule so that they can be used in other modules of the application.