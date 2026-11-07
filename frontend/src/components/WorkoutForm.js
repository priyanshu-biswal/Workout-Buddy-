import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="bg-white p-6 rounded-md shadow-sm border border-gray-100 h-fit" onSubmit={handleSubmit}>
      <h3 className="text-base font-bold text-gray-900 mb-4">Add a New Workout</h3>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Excerise Title:</label>
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`w-full p-2 text-sm border rounded-md outline-none transition-all focus:ring-1 focus:ring-emerald-500 ${
            emptyFields.includes('title') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Load (in Kg's):</label>
        <input 
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={`w-full p-2 text-sm border rounded-md outline-none transition-all focus:ring-1 focus:ring-emerald-500 ${
            emptyFields.includes('load') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Reps:</label>
        <input 
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={`w-full p-2 text-sm border rounded-md outline-none transition-all focus:ring-1 focus:ring-emerald-500 ${
            emptyFields.includes('reps') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      </div>

      <button 
        type="submit" 
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors"
      >
        Add Workout
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-500 text-red-600 text-xs rounded-md">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;