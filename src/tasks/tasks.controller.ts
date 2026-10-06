import { Controller, Get, Param, Query , Post , Body, Patch, Delete , Req} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskStatus } from './enums/task.enum.js';
import { ParseEnumPipe } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
//controller handles the https request and response
//here TasksController is a contoller and it is responsible to handle different types of https like (GET,POST,PATCH,DELETE) 
//it uses TaskServerice for the bussiness logic of these requests
@Controller('tasks')
@UseGuards(JwtAuthGuard) //this is a guard that will be used to protect the routes of this controller. It will check if the request has a valid JWT token. If not, it will throw an error.
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
//GET METHOD
  @Get()
  getTasks(
    @Query(  //Query decorator is used to extract the query parameters from the request and pass them to the method as arguments.(for status)
        'status',
  new ParseEnumPipe(TaskStatus, { optional: true }),//this is a pipe that will validate the status query parameter and convert it to the TaskStatus enum. If the status is not valid, it will throw an error. The optional: true option allows the status query parameter to be optional.
)
status: TaskStatus,
    @Query('search') search: string, //query decorator for search.,
    @Req() request: any
)
  {
    if (status) { //if status is provided then it will call the getTasksByStatus.
      return this.tasksService.getTasksByStatus(status, request.user.sub);
    }
    if (search) { //if search is provided then it will call the getTasksBySearch.
      return this.tasksService.getTasksBySearch(search, request.user.sub);
    }
                  //if no query parameters are provided then it will call the getTasks method of the service to get all tasks.
    return this.tasksService.getTasks(
      request.user.sub,
     
    );
  }
  
//GET METHOD WITH ID.
@Get(':id')
getTaskById(
  @Param('id') id: string,
  @Req() request: any,
) {
  return this.tasksService.getTaskById(id,request.user.sub,);
}
//POST METHOD
  @Post()
    createTask( //this is a method that will be called when a POST request is made to the /tasks endpoint. It will create a new task in the database using the service.
        @Body() //body decorator is used to extract the body of the request and pass it to the method as an argument , body coming from the cilent side will follow CreateTaskDto structure.
        task: CreateTaskDto,
        @Req()  //request decorator is used to extract the request object from the request and pass it to the method as an argument. It will be used to get the user id from the JWT token.
        request:any
    ) {
        return this.tasksService.createTask( task , request.user.sub ); //create a new task in the database using the service
    }
    //Patch method is used to update the task with the given id. It will update the task in the database using the service.
    @Patch(':id')
    updateTask(
      @Param('id') id: string,
      @Body() task: UpdateTaskDto,
      @Req() request: any
    ) {
      return this.tasksService.updateTask(id, task , request.user.sub);
    }
    //DELETE METHOD.
    @Delete(':id')
deleteTask(
  @Param('id') id: string,
  @Req() request: any,
) {
  return this.tasksService.deleteTask(
    id,
    request.user.sub,
  );
}
    
}
