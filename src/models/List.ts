import mongoose, { Schema, Document } from 'mongoose';

interface IList extends Document {
  title: string;
  description: string;
  boardId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const listSchema = new Schema({
  title: { type: String, required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IList>('List', listSchema);

