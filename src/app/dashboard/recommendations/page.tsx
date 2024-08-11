import React from "react";
import Recommendations from "./recommendations";
import ProtectedRoute from "@/components/shared/protected-route";

export default async function Page() {
  return (
    <ProtectedRoute>
      <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <Recommendations />
      </div>
    </ProtectedRoute>
  );
}
