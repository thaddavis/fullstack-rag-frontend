import { TrashIcon } from "@heroicons/react/24/outline";
import React, { ReactElement } from "react";

interface Workout {
  name: string;
  description: string;
}

export const WorkoutCard = (workout: Workout): ReactElement => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between">
        <h5 className="text-lg font-bold">{workout.name}</h5>
        {/* <button className="text-red-500" onClick={workout.onTriggerDelete}>
        <TrashIcon className="h-5 w-5" />
      </button> */}
      </div>
      <p className="text-sm">{workout.description}</p>
    </div>
  );
};
