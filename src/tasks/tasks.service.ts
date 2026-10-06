import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './enums/task.enum.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService{
    constructor(
        @InjectModel(Task.name) //need to inject the model into the service so we can use it to interact with the database
        private taskModel: Model<Task> //store the model in a private property so we can use it in the methods of the service
    ){}
    async getTasks(userId: string) {
        return this.taskModel.find({ userId });
      } //The model is an object/API that knows how to interact with the MongoDB collection.
    //taskModel is the tool we use to query and modify the data in MongoDB.

    async getTasksByStatus(status:TaskStatus, userId:string){
        return this.taskModel.find({status:status,userId}) //find all tasks with the given status
    }

    async getTasksBySearch(search:string ,userId:string){
        return this.taskModel.find({
            $or:[
                {title:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}}
            ],
            userId:userId
        })
    }
    async getTaskById(id: string, userId: string) {
        const task = await this.taskModel.findOne({
          uuid: id,
          userId: userId,
        });
      
        if (!task) {
          throw new NotFoundException('Task not found');
        }
      
        return task;
      }
    async createTask(task:CreateTaskDto,userId:string){
        {
            const newTask = {
              ...task,
              uuid: uuidv4(),
              userId: userId,
            };
        return this.taskModel.create(newTask) //create a new task in the database
        }
    }
    
    async updateTask(
      id: string,
      task: UpdateTaskDto,
      userId: string,
    ) {
      const updatedTask = await this.taskModel.findOneAndUpdate(
        {
          uuid: id, 
          userId: userId,
        },
        {
          $set: task,
        },
        {
          new: true,
        },
      );
    
      if (!updatedTask) {
        throw new NotFoundException('Task not found');
      }
    
      return updatedTask;
    }
    async deleteTask(id: string, userId: string) {
      const task = await this.taskModel.findOneAndDelete({
        uuid: id,
        userId: userId,
      });
    
      if (!task) {
        throw new NotFoundException('Task not found');
      }
    
      return {
        message: 'Task deleted successfully',
      };
    }
        

      }