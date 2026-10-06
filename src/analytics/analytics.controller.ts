import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('tasks/status')
  getTaskCountByStatus(@Req() request: any) {
    return this.analyticsService.getTaskCountByStatus(
      request.user.sub,
    );
  }

  @Get('tasks/total')
    getTotalTaskCount(@Req() request: any) {
        return this.analyticsService.getTotalTaskCount(
        request.user.sub,
        );
    }
    @Get('tasks/users')
getTasksWithUsers(@Req() request: any) {
  return this.analyticsService.getTasksWithUsers(request.user.sub);
}
}