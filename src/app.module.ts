import { MiddlewareConsumer, Module , NestMiddleware ,NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { UsersModule } from './users/users.module.js';
import{ AuthModule } from './auth/auth.module.js';
import { AnalyticsModule } from './analytics/analytics.module.js';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,}),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    //forRoot connects to the database, and forFeature defines the schema and model for a specific feature of the application.
    
    TasksModule,  
    UsersModule,
    AuthModule,
    AnalyticsModule
    //we call taskmodule here to use it in the app module. This is how we can use the taskmodule in the app module. We can use the taskmodule in the app module because we have imported it in the app module.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) { //configure allows you to define which middleware should be applied to which routes. In this case, it is applying the LoggerMiddleware to all routes.
    consumer
    .apply(LoggerMiddleware) //apply the middleware to the consumer
    .forRoutes('*'); //apply the middleware to all routes
  }
}
