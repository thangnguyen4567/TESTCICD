import { Request, Response } from 'express';
import Card from '../models/Card';

export const getCardsByList = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const cards = await Card.find({ listId }).sort({ order: 1 });
  res.json(cards);
};

export const createCard = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { title, description, order } = req.body;
  const card = new Card({ title, description, order, listId });
  await card.save();
  res.status(201).json(card);
};

export const updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, order, listId } = req.body;

  const card = await Card.findByIdAndUpdate(
    id,
    { title, description, order, listId },
    { new: true }
  );
  if (!card) return res.status(404).json({ message: 'Card not found' });

  res.json(card);
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const card = await Card.findByIdAndDelete(id);
  if (!card) return res.status(404).json({ message: 'Card not found' });

  res.json({ message: 'Card deleted' });
};
