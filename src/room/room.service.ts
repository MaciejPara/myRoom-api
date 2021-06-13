import { Inject, Injectable } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { Model } from 'mongoose';

/**
 * RoomService handles operations for offer services
 */
@Injectable()
export class RoomService {
  /**
   * @constructor
   * @param roomModel
   */
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>,
  ) {}

  /**
   * Creates single offer
   * @param {CreateRoomDto} createRoomDto
   * @returns {Promise<Room>} offer
   */
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  /**
   * Finds all offers
   * @returns {Promise<Room[]>} offers
   */
  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  /**
   * Finds single offer
   * @param {string} id
   * @returns {Promise<Room>} offer
   */
  async findOne(id: string): Promise<Room> {
    try {
      return await this.roomModel.findById(id).exec();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Updates single offer
   * @param {Room} room
   * @returns {object} updateObject
   */
  async update(room: Room): Promise<any> {
    try {
      return this.roomModel.updateOne({ _id: room._id }, room).exec();
    } catch (e) {
      console.error(e);
    }
  }
}
