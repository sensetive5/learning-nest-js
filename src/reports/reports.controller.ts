import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get, 
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ReportDTO } from './dtos/reportDTO';
import { SanitizePrivateUserData } from 'src/interceptors/serialize.interceptor';
import { CreateReportDTO } from './dtos/createReportDTO';
import { Patch, Param } from '@nestjs/common';
import { ApproveReportDTO } from './dtos/approveReportDTO';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDTO } from './dtos/getEstimateDTO';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  
  @Get()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this.reportsService.createEstimate(query);
  }

  @Post('/report')
  @UseGuards(AuthGuard)
  @SanitizePrivateUserData(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: UserEntity) {
    return this.reportsService.createReport(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDTO) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
