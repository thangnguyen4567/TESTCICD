import { Request, Response } from 'express';
import List from '../models/List';

export const createList = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { boardId } = req.params;
    const list = new List({ title, description, boardId, order: 0, createdAt: new Date(), updatedAt: new Date() });
    await list.save();
    res.status(201).json(list);
}

export const getListsByBoard = async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const lists = await List.find({ boardId }).sort({ order: 1 });
    res.status(200).json(lists);
}

export const updateList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, order } = req.body;
    const list = await List.findByIdAndUpdate(id, { title, description, order }, { new: true });
    if (!list) {
        return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
}

export const deleteList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const list = await List.findByIdAndDelete(id);
    if (!list) {
        return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted successfully' });
}

