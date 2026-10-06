import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema,Task } from './schemas/task.schema.js';
import { AuthModule } from '../auth/auth.module.js';

//MODULE is a decorator that is used to define a module in nestjs.
//The function of module is to organize the application structure into cohesive blocks of functionality. It allows you to group related components, services, and controllers together, making the codebase more modular and maintainable. Modules help in encapsulating features, promoting reusability, and managing dependencies effectively within a NestJS application.
//Decorators are a special kind of declaration that can be attached to a class, method, accessor, property, or parameter.
@Module({
  imports: [MongooseModule.forFeature([{ name:Task.name, schema: TaskSchema }]),
            AuthModule
],//FORFEATURE is a method that is used to define a feature module in nestjs. It allows you to define the schema and model for a specific feature of the application. In this case, it is defining the schema and model for the Task feature.
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
