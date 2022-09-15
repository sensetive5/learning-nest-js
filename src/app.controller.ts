import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { ApproveReportDTO } from './reports/dtos/approveReportDTO';
import { ReportsService } from './reports/reports.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
