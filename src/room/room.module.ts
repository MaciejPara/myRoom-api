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
    hotelName: `Hotel & Room name`,
    shortDescription: 'short description lorem',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad asperiores, beatae consequuntur cumque debitis, dicta et eveniet illo in incidunt labore laborum libero molestias necessitatibus sequi, voluptatem. Accusamus eius laborum nisi placeat veritatis. Blanditiis deleniti ea, facilis fuga fugiat incidunt iusto magnam minus qui reiciendis, sed sint soluta, tenetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis consectetur culpa deleniti in, perferendis recusandae repellendus rerum soluta voluptates? Animi commodi culpa cupiditate distinctio enim esse et facere fuga fugit iure molestiae, neque nisi nostrum obcaecati omnis placeat quisquam quo similique sint tenetur vitae voluptatem voluptatibus? Ab, accusamus aperiam atque corporis culpa cum dignissimos earum enim eos et exercitationem ipsam, ipsum iure magnam magni maxime molestiae nobis nulla numquam officiis quam quasi quisquam repellendus sed sunt totam unde vel veritatis vero voluptatibus. Aspernatur consequatur consequuntur excepturi impedit ipsam magnam natus saepe voluptatem! Aliquam fuga illo minus neque sed veritatis?',
    address: `2/6 Stare Miasto, 00-000, Kraków`,
    pricePerDay: 30,
    currency: 'USD',
    img: 'https://via.placeholder.com/1024x400',
    rates: [],
    facilities: [
      {
        name: 'WiFi',
        iconClass: 'fa-wifi',
      },
      {
        name: 'Animals',
        iconClass: 'fa-paw',
      },
      {
        name: 'Bath',
        iconClass: 'fa-bath',
      },
    ],
  };

  constructor(private readonly roomService: RoomService) {
    this.initTestingRoom();
  }

  async initTestingRoom() {
    const allRooms: Room[] = await this.roomService.findAll();
    const isExistingRoom: boolean = allRooms.length > 0;

    if (!isExistingRoom) {
      new Array(10).fill(null).forEach(async (item, key) => {
        await this.roomService.create(this.room);
      });
    }
  }
}
