// @ts-ignore
import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly shortDescription: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly imgUrl: string;
}
