import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';

const SendGrid = require('@sendgrid/mail');

/**
 * OrderService handles operations for order service
 */
@Injectable()
export class OrderService {
  private sg = SendGrid;

  /**
   * @constructor
   * @param {object} orderModel
   */
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: Model<Order>,
  ) {
    const { SENDGRID_API_KEY } = process.env;

    if (SENDGRID_API_KEY) this.sg.setApiKey(SENDGRID_API_KEY);
  }

  /**
   * Creates single order
   * @param {object} createOrderDto
   * @returns {object} result - single order
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    const result = await createdOrder.save();
    const path = `http://localhost:8080/rate/${result.offerId}`;
    let rates = '';

    new Array(5).fill(null).forEach((item, key) => {
      const rate = key + 1;
      rates += `<a style="padding: 20px;font-size: 20px;" href="${path}/${result._id}/${rate}">${rate}</a>`;
    });

    try {
      await this.sg.send({
        to: 'cienias98@gmail.com',
        from: 'm.admin@my.room.com',
        subject: `MyRoom order - ${result._id}`,
        text: 'Order',
        html: `
            <div>
                <h1>You just ordered a room</h1>
                <p>start date: ${result.date.start}</p>
                <p>end date: ${result.date.end}</p>
                <p>price: ${result.price}${result.currency}</p>
                
                <h2>Please, rate an offer in 1-5 scale</h2>
                <div>
                    ${rates}
                </div>
            </div>`,
      });
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  /**
   * Finds all orders
   * @returns {Promise<Order[]>} orders
   */
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  /**
   * Finds single order
   * @param {string} id
   * @returns {Promise<Order>} order
   */
  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }
}
