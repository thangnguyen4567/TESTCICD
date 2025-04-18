import express from 'express';
import cors from 'cors';
import boardRoutes from '../routes/board.routes';
import listRoutes from '../routes/list.routes';
import cardRoutes from '../routes/card.routes';

// Create a test app instance
export const createTestApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/boards', boardRoutes);
  app.use('/lists', listRoutes);
  app.use('/cards', cardRoutes);
  
  return app;
}; 