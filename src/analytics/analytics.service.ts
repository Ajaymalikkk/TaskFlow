import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../tasks/schemas/task.schema.js';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async getTaskCountByStatus(userId: string) {
    const result = await this.taskModel.aggregate([
        {
            $match: {
            userId: userId,
            },
        },
      {
        $group: {
          _id: '$status',
          total: { $sum: 1 },
          
        },
      },
      {
        $sort: { total: -1 }, 
      }
    ]);
  
    return result;
  }


    async getTotalTaskCount(userId:string){
        const totalTaskCount = await this.taskModel.aggregate([
            {
                $match:{userId:userId}
            },
            {
                $count:'totalTask='

                
            },
            {
                $unwind: '$user',
              },
        ])
        return totalTaskCount;
    }

    async getTasksWithUsers(userId: string) {
        const result = await this.taskModel.aggregate([
          {
            $match: {
              userId: userId,
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: 'id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $project: {
              _id: 0,
              uuid: 1,
              title: 1,
              description: 1,
              priority: 1,
              status: 1,
              user: {
                name: 1,
                email: 1,
              },
            },
          }
        ]);
      
        return result;
      }
}