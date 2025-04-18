 import { Request, Response } from 'express';
 import Board from '../models/Board';

 export const createBoard = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const board = new Board({ title, description, createdAt: new Date(), updatedAt: new Date() });
    await board.save();
    res.status(201).json(board);
    
 }

 export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await Board.find();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching boards' });
    }
 }
 
 export const updateBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedBoard = await Board.findByIdAndUpdate(id, { title, description, updatedAt: new Date() }, { new: true });

    if (!updatedBoard) {
        return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json(updatedBoard);
 }

 export const deleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedBoard = await Board.findByIdAndDelete(id);

    if (!deletedBoard) {
        return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json({ message: 'Board deleted successfully' });
 }
 
 
