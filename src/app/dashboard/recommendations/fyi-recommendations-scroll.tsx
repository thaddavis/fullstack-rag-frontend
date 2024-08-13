"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WorkoutCard } from "@/components/shared/ui/workout-card";
import { InfiniteScroller } from "@/components/shared/ui/infinite-scroller";

export default function RecommendationsScroll() {
  const [searchQuery, setSearchQuery] = useState("");

  // @ts-ignore
  const fetchWorkoutRecommendations = async ({ pageParam }) => {
    console.log("pageParam", pageParam);

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
          text: searchQuery,
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
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      if (lastPage.cursor >= 40) {
        return null;
      } else {
        return lastPage.cursor;
      }
    },
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      fetchWorkoutRecommendations({ pageParam: 0 });
    }
  };

  const handleFetchNextPage = () => {
    if ((data?.pages?.length || 0) >= 4) {
      return; // Stop fetching more pages if the maximum limit is reached
    }
    fetchNextPage();
  };

  console.log("data", data);
  console.log("hasNextPage", hasNextPage);

  if (status === "error") {
    return <div>Error Occurred</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full">
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What are you looking for?"
              className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-blue-600"
            />
          </div>
        </div>

        <InfiniteScroller
          fetchNextPage={handleFetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          loadingMessage={<p>Loading...</p>}
          endingMessage={<p></p>}
        >
          <>
            {data?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group?.data?.map(
                  (recommendation: {
                    id: number;
                    name: string;
                    description: string;
                  }) => (
                    <WorkoutCard
                      key={recommendation.id}
                      name={recommendation.name}
                      description={recommendation.description}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </>
        </InfiniteScroller>
      </div>
    </>
  );
}
