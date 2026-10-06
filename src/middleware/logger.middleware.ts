import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
    console.log(`Request Query: ${JSON.stringify(req.query)}`);
    console.log(`Request Params: ${JSON.stringify(req.params)}`);
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
    next();
  }
}
//in this file, we have created a LoggerMiddleware class that implements the NestMiddleware interface. 
//This middleware logs the HTTP method, original URL, request body, query parameters, route parameters, and headers of incoming requests. 
//The use method is called for each request, and it logs the relevant information before calling next() to pass control to the next middleware or route handler in the chain.