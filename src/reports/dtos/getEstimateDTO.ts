import {
    IsNumber,
    IsString,
    IsLatitude,
    IsLongitude,
    Max,
    Min,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
  
  const MIN_MILLEAGE = 0;
  const MAX_MILLIAGE = 1000000;
  
  export class GetEstimateDTO {  
    @IsString()
    vendor: string;
  
    @IsString()
    model: string;
  
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;
  
    @Transform(({ value }) => Number(value))
    @IsLongitude()
    lng: number;
    
    @Transform(({ value }) => Number(value))
    @IsLatitude()
    lat: number;
  
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(MIN_MILLEAGE)
    @Max(MAX_MILLIAGE)
    mileage: number;
  }
  