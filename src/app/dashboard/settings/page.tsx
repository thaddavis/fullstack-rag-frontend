"use client";

import { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/auth-context";
import ProtectedRoute from "@/components/shared/protected-route";
import axios from "axios";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { deleteWorkout } from "@/services/deleteWorkout";

export default function Page() {
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [routines, setRoutines] = useState<any[]>([]);
  const [fetchCount, setFetchCount] = useState(0); // Used to trigger a re-fetch of data
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([]);
  const [accordionState, setAccordionState] = useState({
    createWorkout: true,
    createRoutine: false,
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");
        const [workoutsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workouts/workouts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setWorkouts(workoutsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchWorkouts();
  }, [fetchCount]);

  const handleCreateWorkout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/workouts`,
        {
          name: workoutName,
          description: workoutDescription,
        }
      );
      setWorkouts([...workouts, response.data]);
      setWorkoutName("");
      setWorkoutDescription("");
    } catch (error) {
      console.error("Failed to create workout:", error);
    }
  };

  const toggleAccordion = (section: string) => {
    setAccordionState((prevState) => ({
      ...prevState,
      // @ts-ignore
      [section]: !prevState[section],
    }));
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <div className="border rounded-md">
            <h2>
              <button
                className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300"
                onClick={() => toggleAccordion("createWorkout")}
              >
                <span className="inline-flex items-center">
                  Create Workout
                  {accordionState.createWorkout ? (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="ml-2  h-4 w-4" />
                  )}
                </span>
              </button>
            </h2>
            {accordionState.createWorkout && (
              <div className="p-4">
                <form onSubmit={handleCreateWorkout}>
                  <div className="mb-4">
                    <label
                      htmlFor="workoutName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Workout Name
                    </label>
                    <input
                      type="text"
                      id="workoutName"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="workoutDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Workout Description
                    </label>
                    <input
                      type="text"
                      id="workoutDescription"
                      value={workoutDescription}
                      onChange={(e) => setWorkoutDescription(e.target.value)}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Workout
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {workouts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Your workouts:</h3>
            <ul className="space-y-4">
              {workouts.map((workout) => (
                <div className="border rounded-md p-4" key={workout.id}>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-bold">{workout.name}</h5>
                    <button
                      className="text-red-500"
                      onClick={async () => {
                        await deleteWorkout(workout.id);
                        setFetchCount(fetchCount + 1);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm">{workout.description}</p>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
