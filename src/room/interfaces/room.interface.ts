import { Document } from 'mongoose';

export interface Room extends Document {
  readonly hotelName: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly address: string;
  readonly pricePerDay: number;
  readonly img: string;
  readonly currency: string;
  readonly rate: number;
  readonly facilities: object;
}
