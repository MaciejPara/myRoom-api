import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';

/**
 * RoomController handles api methods for offers
 */
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /**
   * Gets offer and calculates rate
   * @param room
   * @returns {number} rateCount
   */
  getRate(room): number {
    return (
      room.rates?.map(({ rate }) => rate).reduce((a, b) => a + b, 0) /
        room.rates.length || 0
    );
  }

  /**
   * Finds all offers
   */
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

  /**
   * Finds single offer by id
   * @param {string} id
   * @returns {object} room - single offer
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let room = { ...(await this.roomService.findOne(id)) } as any;
    room = room._doc;

    room.rate = this.getRate(room);

    return room;
  }

  /**
   * Adds rate to offer
   * @param {string} id - identifier of offer
   * @param {object} object - data with rate and orderId
   * @returns {object} updateObject
   */
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
