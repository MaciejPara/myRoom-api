import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  shortDescription: String,
  description: String,
  hotelName: String,
  address: String,
  pricePerDay: Number,
  img: String,
  currency: String,
  rate: Number,
  facilities: Object,
});
