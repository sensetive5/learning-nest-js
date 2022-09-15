import {
  IsNumber,
  IsString,
  IsLatitude,
  IsLongitude,
  Max,
  Min,
} from 'class-validator';

const MIN_MILLEAGE = 0;
const MAX_MILLIAGE = 1000000;

export class CreateReportDTO {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  vendor: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(MIN_MILLEAGE)
  @Max(MAX_MILLIAGE)
  mileage: number;
}
