// @ts-ignore
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly hotelName: string;

  @IsString()
  readonly shortDescription: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly address: string;

  @IsNumber()
  readonly pricePerDay: number;

  @IsString()
  readonly img: string;

  @IsString()
  readonly currency: string;

  @IsNumber()
  readonly rate: number;

  @IsString()
  readonly facilities: object;
}
