import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Trash2 } from 'lucide-react';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="relative bg-white rounded-md p-5 shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      <h4 className="text-lg font-bold text-emerald-600 mb-2">{workout.title}</h4>
      <p className="text-sm text-gray-700">
        <strong className="font-semibold text-gray-900">Load (in Kgs): </strong>{workout.load}
      </p>
      <p className="text-sm text-gray-700 mt-1">
        <strong className="font-semibold text-gray-900">Reps: </strong>{workout.reps}
      </p>
      <p className="text-xs text-gray-400 mt-3">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button 
        onClick={handleClick}
        aria-label="Delete workout"
        className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-red-600 rounded-full transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default WorkoutDetails;