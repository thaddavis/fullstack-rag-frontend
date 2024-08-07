"use client";

import {
  useContext,
  useState,
  useEffect,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  JSXElementConstructor,
} from "react";
import AuthContext from "@/context/auth-context";
import ProtectedRoute from "@/components/shared/protected-route";
import axios from "axios";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteRoutine } from "@/services/deleteRoutine";

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
    const fetchWorkoutsAndRoutines = async () => {
      try {
        const token = localStorage.getItem("token");
        const [workoutsResponse, routinesResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/workouts/workouts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/routines`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setWorkouts(workoutsResponse.data);
        setRoutines(routinesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchWorkoutsAndRoutines();
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

  const handleCreateRoutine = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/routines`,
        {
          name: routineName,
          description: routineDescription,
          workouts: selectedWorkouts,
        }
      );
      setRoutines([...routines, response.data]);
      setRoutineName("");
      setRoutineDescription("");
      setSelectedWorkouts([]);
    } catch (error) {
      console.error("Failed to create routine:", error);
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
          <div className="border rounded-md">
            <h2>
              <button
                className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300"
                onClick={() => toggleAccordion("createRoutine")}
              >
                <span className="inline-flex items-center">
                  Create Routine
                  {accordionState.createRoutine ? (
                    <span>
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </span>
                  ) : (
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  )}
                </span>
              </button>
            </h2>
            {accordionState.createRoutine && (
              <div className="p-4">
                <form onSubmit={handleCreateRoutine}>
                  <div className="mb-4">
                    <label
                      htmlFor="routineName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Routine Name
                    </label>
                    <input
                      type="text"
                      id="routineName"
                      value={routineName}
                      onChange={(e) => setRoutineName(e.target.value)}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="routineDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Routine Description
                    </label>
                    <input
                      type="text"
                      id="routineDescription"
                      value={routineDescription}
                      onChange={(e) => setRoutineDescription(e.target.value)}
                      required
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="workoutSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Workouts
                    </label>
                    <select
                      multiple
                      id="workoutSelect"
                      value={selectedWorkouts}
                      onChange={(e) =>
                        setSelectedWorkouts(
                          // @ts-ignore
                          [...e.target.selectedOptions].map(
                            (option) => option.value
                          )
                        )
                      }
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      {workouts.map((workout) => (
                        <option key={workout.id} value={workout.id}>
                          {workout.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Routine
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {routines.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Your routines:</h3>
            <ul className="space-y-4">
              {routines.map((routine) => (
                <div className="border rounded-md p-4" key={routine.id}>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-bold">{routine.name}</h5>
                    <button
                      className="text-red-500"
                      onClick={async () => {
                        await deleteRoutine(routine.id);
                        setFetchCount(fetchCount + 1);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm">{routine.description}</p>
                  <ul className="list-disc list-inside mt-2">
                    {routine.workouts &&
                      routine.workouts.map(
                        (workout: {
                          id: Key | null | undefined;
                          name:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          description:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                        }) => (
                          <li key={workout.id}>
                            {workout.name}: {workout.description}
                          </li>
                        )
                      )}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
