import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
  title: string;
  description: string;
  listId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

const cardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
});

export default mongoose.model<ICard>('Card', cardSchema);


