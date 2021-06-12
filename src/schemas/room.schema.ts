import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  shortDescription: String,
  description: String,
  hotelName: String,
  address: String,
  pricePerDay: Number,
  img: String,
  currency: String,
  rates: [
    {
      rate: Number,
      orderId: String,
      createdAt: String,
    },
  ],
  facilities: Object,
});
