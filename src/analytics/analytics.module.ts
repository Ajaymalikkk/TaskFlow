import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller.js';
import { AnalyticsService } from './analytics.service.js';
import {Task , TaskSchema} from '../tasks/schemas/task.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';

@Module({

    imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),AuthModule,],
    
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  
})
export class AnalyticsModule {}
