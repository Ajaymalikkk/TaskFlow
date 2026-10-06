import {
    IsNotEmpty,
    IsString,
    IsEnum,
    
  } from 'class-validator'; //class-validator is a library that allows you to validate the data of your classes. 
  //It provides decorators that you can use to validate the properties of your classes.
  
  import { TaskPriority,TaskStatus } from '../enums/task.enum.js';

  export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsEnum(TaskStatus)
    status: TaskStatus;
  }