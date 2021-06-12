import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { DatabaseModule } from '../database/database.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OrderController],
      providers: [OrderService, ...orderProviders],
      exports: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
