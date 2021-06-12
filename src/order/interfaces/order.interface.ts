import { Document } from 'mongoose';

export interface Order extends Document {
  readonly date: {
    start: string;
    end: string;
  };
  readonly email: string;
  readonly name: string;
  readonly offerId: string;
  readonly surname: string;
  readonly price: number;
  readonly currency: string;
}
