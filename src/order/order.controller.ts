import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

/**
 * OrderController handles order actions
 */
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates single order
   * @param {object} body
   * @returns {Order} order
   */
  @Post()
  create(@Body() body) {
    return this.orderService.create(body);
  }
}
