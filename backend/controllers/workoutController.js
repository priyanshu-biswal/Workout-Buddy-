import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// GET all workouts (latest first)
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (load === undefined || load === null || load === '') emptyFields.push('load');
  if (reps === undefined || reps === null || reps === '') emptyFields.push('reps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};