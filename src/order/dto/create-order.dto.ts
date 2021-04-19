// @ts-ignore
import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly title: string;
}
