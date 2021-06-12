import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  getRate(room): number {
    return (
      room.rates?.map(({ rate }) => rate).reduce((a, b) => a + b, 0) /
        room.rates.length || 0
    );
  }

  @Get()
  async findAll() {
    const result = await this.roomService.findAll();

    return result.map((item) => {
      let room = { ...item } as any;
      room = room._doc;

      if (room.rates) {
        room.rate = this.getRate(room);
      }
      return room;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let room = { ...(await this.roomService.findOne(id)) } as any;
    room = room._doc;

    room.rate = this.getRate(room);

    return room;
  }

  @Post(':id/rate')
  async addRate(@Param('id') id, @Body() { rate, orderId }): Promise<any> {
    try {
      const room = await this.roomService.findOne(id);

      if (room) {
        room.rates.push({ rate, orderId, createdAt: new Date().toString() });

        return this.roomService.update(room);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
