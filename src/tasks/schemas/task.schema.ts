//schema for tasks 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskPriority,TaskStatus } from '../enums/task.enum.js';
@Schema()
export class Task {
  //Prop is a decorator that is used to define a property in a mongoose schema. It allows you to specify the type of the property, whether it is required, and other validation rules.
    @Prop({
        required: true,
        unique: true,
    })
    uuid:string;

    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop({
        enum: TaskPriority,
        required: true, //this is a validation rule that will be enforced by mongoose. It will throw an error if the value is not one of the enum values.
      })
      priority: TaskPriority;
      
      @Prop({
        enum: TaskStatus,
        required: true,
      })
      status: TaskStatus;

      @Prop({ required: true })
      userId: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);