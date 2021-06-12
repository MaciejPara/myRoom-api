import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database/database.module';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OrderController],
      providers: [OrderService, ...orderProviders],
      exports: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
