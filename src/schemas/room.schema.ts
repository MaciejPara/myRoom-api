import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  description: String,
  imgUrl: String,
});
