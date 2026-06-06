import express from 'express';
import { AppDataSource } from './data-source';
import cursoRoutes from './src/routes/cursoRoute';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api', cursoRoutes);

// Global error handler (should be last)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));