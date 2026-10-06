import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto.js';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
//Partialtype is a utility function that takes a class and returns a new class with all the properties of the original class set to optional. 
