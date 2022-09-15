import { Expose, Transform } from 'class-transformer';
import { UserEntity } from 'src/users/user.entity';

export class ReportDTO {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  vendor: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
