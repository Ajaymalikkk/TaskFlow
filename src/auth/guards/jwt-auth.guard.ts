import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean { //execution context is an object that provides information about the current request being processed. It allows access to the request and response objects, as well as other details about the execution environment.
      const request = context.switchToHttp().getRequest();//switchToHttp() method is used to switch the execution context to an HTTP context, allowing access to the HTTP request and response objects. getRequest() method retrieves the HTTP request object from the execution context.
  
      const authHeader = request.headers.authorization;//authJHeader is a variable that stores the value of the Authorization header from the incoming HTTP request. This header typically contains the JWT token in the format "Bearer <token>".
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization token is required');
      }
  
      const [type, token] = authHeader.split(' ');
  
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization format');
      }
  
      try {
        const payload = this.jwtService.verify(token);
  
        request.user = payload;
  
        return true;
      } catch {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  //in this file, we have created a JwtAuthGuard class that implements the CanActivate interface.
  // This guard checks if the incoming request has a valid JWT token in the Authorization header. 
   //If the token is valid, it allows access to the route; otherwise, it throws an UnauthorizedException. 
   //The guard uses the JwtService to verify the token and extract the payload, which is then attached to the request object for further use in the application.