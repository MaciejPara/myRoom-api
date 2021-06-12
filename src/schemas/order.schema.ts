import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  date: Object,
  email: String,
  name: String,
  offerId: String,
  surname: String,
  price: Number,
  currency: String,
});
