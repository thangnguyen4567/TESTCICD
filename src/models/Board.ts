 
import mongoose, { Schema, Document } from 'mongoose';

interface IBoard extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model<IBoard>('Board', boardSchema);
