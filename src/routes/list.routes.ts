import { RequestHandler, Router } from 'express';
import { createList, getListsByBoard, updateList, deleteList } from '../controllers/list.controllers';
const router = Router();

router.post('/', createList as RequestHandler);
router.get('/', getListsByBoard as RequestHandler);
router.put('/:id', updateList as RequestHandler);
router.delete('/:id', deleteList as RequestHandler);

export default router;
