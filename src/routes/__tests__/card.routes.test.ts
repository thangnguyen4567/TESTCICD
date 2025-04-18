import request from 'supertest';
import mongoose from 'mongoose';
import { createTestApp } from '../../tests/app';
import Card from '../../models/Card';
import List from '../../models/List';
import Board from '../../models/Board';

// Import the test setup
import '../../tests/setup';

const app = createTestApp();

describe('Card Routes', () => {
  let boardId: mongoose.Types.ObjectId;
  let listId: mongoose.Types.ObjectId;
  
  // Create a test board and list before each test
  beforeEach(async () => {
    const board = await Board.create({
      title: 'Test Board',
      description: 'A test board for cards'
    });
    boardId = board._id as mongoose.Types.ObjectId;
    
    const list = await List.create({
      title: 'Test List',
      boardId
    });
    listId = list._id as mongoose.Types.ObjectId;
  });
  
  describe('GET /lists/:listId/cards', () => {
    it('should return all cards for a list', async () => {
      // Create test cards
      await Card.create([
        { title: 'Card 1', description: 'Description 1', listId, order: 0 },
        { title: 'Card 2', description: 'Description 2', listId, order: 1 }
      ]);
      
      const response = await request(app)
        .get(`/cards/lists/${listId}/cards`)
        .expect(200);
        
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Card 1');
      expect(response.body[1].title).toBe('Card 2');
    });
  });
  
  describe('POST /lists/:listId/cards', () => {
    it('should create a new card', async () => {
      const newCard = {
        title: 'Test Card',
        description: 'A test card',
        order: 0
      };
      
      const response = await request(app)
        .post(`/cards/lists/${listId}/cards`)
        .send(newCard)
        .expect(201);
        
      expect(response.body.title).toBe(newCard.title);
      expect(response.body.description).toBe(newCard.description);
      expect(response.body.listId).toBe(listId.toString());
    });
  });
  
  describe('PUT /cards/:id', () => {
    it('should update a card by id', async () => {
      // Create test card
      const card = await Card.create({
        title: 'Original Title',
        description: 'Original Description',
        listId,
        order: 0
      });
      
      const updates = {
        title: 'Updated Title',
        description: 'Updated Description',
        order: 1
      };
      
      const response = await request(app)
        .put(`/cards/${card._id}`)
        .send(updates)
        .expect(200);
        
      expect(response.body.title).toBe(updates.title);
      expect(response.body.description).toBe(updates.description);
      expect(response.body.order).toBe(updates.order);
    });
    
    it('should return 404 if card not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/cards/${fakeId}`)
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });
  
  describe('DELETE /cards/:id', () => {
    it('should delete a card by id', async () => {
      // Create test card
      const card = await Card.create({
        title: 'Test Card',
        description: 'Test Description',
        listId,
        order: 0
      });
      
      await request(app)
        .delete(`/cards/${card._id}`)
        .expect(200);
        
      // Verify card was deleted
      const deletedCard = await Card.findById(card._id);
      expect(deletedCard).toBeNull();
    });
    
    it('should return 404 if card not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/cards/${fakeId}`)
        .expect(404);
    });
  });
}); 