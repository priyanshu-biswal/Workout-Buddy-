import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/workouts', workoutRoutes);

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set. Add it to backend/.env before starting the API.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });