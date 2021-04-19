import { Inject, Injectable } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdCat = new this.roomModel(createRoomDto);
    return createdCat.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel
      .findOne({
        where: {
          id,
        },
      })
      .exec();
  }
}
