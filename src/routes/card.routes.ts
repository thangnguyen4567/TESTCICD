import { RequestHandler, Router } from 'express';
import {
  getCardsByList,
  createCard,
  updateCard,
  deleteCard,
} from '../controllers/card.controllers';

const router = Router();

router.get('/lists/:listId/cards', getCardsByList as RequestHandler);
router.post('/lists/:listId/cards', createCard as RequestHandler);
router.put('/:id', updateCard as RequestHandler);
router.delete('/:id', deleteCard as RequestHandler);

export default router;
