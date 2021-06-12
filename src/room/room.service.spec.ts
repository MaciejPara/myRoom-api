import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { roomProviders } from './room.providers';
import { DatabaseModule } from '../database/database.module';

describe('RoomService', () => {
  let service: RoomService;
  let roomId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [RoomService, ...roomProviders],
      controllers: [RoomController],
      exports: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return rooms', async () => {
    const result = await service.findAll();

    if (result.length) roomId = result[0]._id;

    expect(result).toBeDefined();
  });

  it('should return single room', async () => {
    const result = await service.findOne(roomId);

    expect(result._id.toString()).toBe(roomId.toString());
  });
});
