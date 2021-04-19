import { Document } from 'mongoose';

export interface Room extends Document {
  readonly title: string;
  readonly shortDescription: number;
  readonly description: string;
  readonly imgUrl: string;
}
