import { Router, RequestHandler } from 'express';
import { createBoard, getBoards, updateBoard, deleteBoard } from '../controllers/board.controller';
const router = Router();

router.post('/', createBoard as RequestHandler);
router.get('/', getBoards as RequestHandler);
router.put('/:id', updateBoard as RequestHandler);
router.delete('/:id', deleteBoard as RequestHandler);

export default router;
