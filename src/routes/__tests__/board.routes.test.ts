import request from 'supertest';
import mongoose from 'mongoose';
import { createTestApp } from '../../tests/app';
import Board from '../../models/Board';

// Import the test setup
import '../../tests/setup';

const app = createTestApp();

describe('Board Routes', () => {
  describe('POST /boards', () => {
    it('should create a new board', async () => {
      const newBoard = {
        title: 'Test Board',
        description: 'A test board'
      };
      
      const response = await request(app)
        .post('/boards')
        .send(newBoard)
        .expect(201);
        
      expect(response.body.title).toBe(newBoard.title);
      expect(response.body.description).toBe(newBoard.description);
      expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
    });
  });
  
  describe('GET /boards', () => {
    it('should return all boards', async () => {
      // Create test boards
      await Board.create([
        { title: 'Board 1', description: 'Description 1' },
        { title: 'Board 2', description: 'Description 2' }
      ]);
      
      const response = await request(app)
        .get('/boards')
        .expect(200);
        
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe('Board 1');
      expect(response.body[1].title).toBe('Board 2');
    });
  });
  
  describe('PUT /boards/:id', () => {
    it('should update a board by id', async () => {
      // Create test board
      const board = await Board.create({
        title: 'Original Title',
        description: 'Original Description'
      });
      
      const updates = {
        title: 'Updated Title',
        description: 'Updated Description'
      };
      
      const response = await request(app)
        .put(`/boards/${board._id}`)
        .send(updates)
        .expect(200);
        
      expect(response.body.title).toBe(updates.title);
      expect(response.body.description).toBe(updates.description);
    });
    
    it('should return 404 if board not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/boards/${fakeId}`)
        .send({ title: 'Updated Title', description: 'Updated Description' })
        .expect(404);
    });
  });
  
  describe('DELETE /boards/:id', () => {
    it('should delete a board by id', async () => {
      // Create test board
      const board = await Board.create({
        title: 'Test Board',
        description: 'Test Description'
      });
      
      await request(app)
        .delete(`/boards/${board._id}`)
        .expect(200);
        
      // Verify board was deleted
      const deletedBoard = await Board.findById(board._id);
      expect(deletedBoard).toBeNull();
    });
    
    it('should return 404 if board not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/boards/${fakeId}`)
        .expect(404);
    });
  });
}); 