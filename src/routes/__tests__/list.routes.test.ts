import request from 'supertest';
import mongoose from 'mongoose';
import { createTestApp } from '../../tests/app';
import List from '../../models/List';
import Board from '../../models/Board';

// Import the test setup
import '../../tests/setup';

const app = createTestApp();

describe('List Routes', () => {
  let boardId: mongoose.Types.ObjectId;
  
  // Create a test board before all tests
  beforeEach(async () => {
    const board = await Board.create({
      title: 'Test Board',
      description: 'A test board for lists'
    });
    boardId = board._id as mongoose.Types.ObjectId;
  });
  
  describe('POST /lists', () => {
    it('should create a new list', async () => {
      const newList = {
        title: 'Test List',
        boardId: boardId.toString()
      };
      
      const response = await request(app)
        .post('/lists')
        .send(newList)
        .expect(201);
        
      expect(response.body.title).toBe(newList.title);
      expect(response.body.boardId).toBe(newList.boardId);
    });
  });
  
  describe('GET /lists', () => {
    it('should return all lists for a board', async () => {
      // Create test lists
      await List.create([
        { title: 'List 1', boardId },
        { title: 'List 2', boardId }
      ]);
      
      const response = await request(app)
        .get(`/lists?boardId=${boardId}`)
        .expect(200);
        
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('List 1');
      expect(response.body[1].title).toBe('List 2');
    });
  });
  
  describe('PUT /lists/:id', () => {
    it('should update a list by id', async () => {
      // Create test list
      const list = await List.create({
        title: 'Original Title',
        boardId
      });
      
      const updates = {
        title: 'Updated Title',
        order: 1
      };
      
      const response = await request(app)
        .put(`/lists/${list._id}`)
        .send(updates)
        .expect(200);
        
      expect(response.body.title).toBe(updates.title);
      expect(response.body.order).toBe(updates.order);
    });
    
    it('should return 404 if list not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/lists/${fakeId}`)
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });
  
  describe('DELETE /lists/:id', () => {
    it('should delete a list by id', async () => {
      // Create test list
      const list = await List.create({
        title: 'Test List',
        boardId
      });
      
      await request(app)
        .delete(`/lists/${list._id}`)
        .expect(200);
        
      // Verify list was deleted
      const deletedList = await List.findById(list._id);
      expect(deletedList).toBeNull();
    });
    
    it('should return 404 if list not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/lists/${fakeId}`)
        .expect(404);
    });
  });
}); 