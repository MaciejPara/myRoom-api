import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from '../database/database.module';
import { roomProviders } from './room.providers';

@Module({
  imports: [DatabaseModule],
  providers: [RoomService, ...roomProviders],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
