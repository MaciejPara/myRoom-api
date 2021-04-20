import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from '../database/database.module';
import { roomProviders } from './room.providers';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './interfaces/room.interface';

@Module({
  imports: [DatabaseModule],
  providers: [RoomService, ...roomProviders],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {
  private room: CreateRoomDto = {
    title: 'Room',
    shortDescription: 'shortDescription',
    description: 'description',
    imgUrl:
      'https://media-cdn.tripadvisor.com/media/photo-s/13/db/45/9e/dolmen-hotel-malta.jpg',
  };

  constructor(private readonly roomService: RoomService) {
    this.initTestingRoom();
  }

  async initTestingRoom() {
    const allRooms: Room[] = await this.roomService.findAll();
    const isExistingRoom: boolean = allRooms.length > 0;

    if (!isExistingRoom) {
      await this.roomService.create(this.room);
    }
  }
}
