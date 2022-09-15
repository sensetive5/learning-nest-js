import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/createReportDTO';
import { GetEstimateDTO } from './dtos/getEstimateDTO';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>,
  ) {}

  async createReport(reportDTO: CreateReportDTO, user: UserEntity) {
    const report = this.repo.create(reportDTO);

    return this.repo.save({ ...report, user });
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({
      where: {
        id,
      },
      lock: {
        mode: 'dirty_read',
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return this.repo.save({ ...report, approved });
  }

  createEstimate({ model, vendor, lng, lat, year, mileage }: GetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('vendor = :vendor', { vendor })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
