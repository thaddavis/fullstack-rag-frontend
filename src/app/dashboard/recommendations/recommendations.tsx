"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Recommendations() {
  const [searchQuery, setSearchQuery] = useState("");

  // @ts-ignore
  const fetchWorkoutRecommendations = async ({ pageParam }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recommendations/workouts?cursor=` +
        pageParam,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
        }),
      }
    );
    return res.json();
  };

  const {
    isFetchingNextPage,
    status,
    fetchNextPage,
    error,
    isFetching,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["recommendations"],
    queryFn: fetchWorkoutRecommendations,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      fetchWorkoutRecommendations({ pageParam: 0 });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="mx-auto max-w-2xl px-4 ">
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-8 shadow-sm">
            <h1 className="text-center text-5xl font-semibold leading-12">
              Recommendations 🏋️‍♂️
            </h1>
          </div>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group?.data?.map(
                  (recommendation: {
                    id: number;
                    name: string;
                    description: string;
                  }) => (
                    <p key={recommendation.id}>{recommendation.name}</p>
                  )
                )}
              </React.Fragment>
            ))}
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>

            {isFetching && !isFetchingNextPage ? "Fetching..." : null}
          </>
        )}
      </div>
    </>
  );
}
