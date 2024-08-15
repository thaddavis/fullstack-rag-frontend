"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";

export function MultiModalContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["media-assets/query"],
    queryFn: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/multi-modal/media-assets/query`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: searchQuery,
          }),
        }
      );

      return await resp.json();
    },
    enabled: isQueryEnabled,
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && searchQuery) {
      !isQueryEnabled && setIsQueryEnabled(true);
      refetch();
    }
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="w-full">
        <label
          htmlFor="search"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search media assets
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

      <div className="w-full grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-3">
        {data?.results?.map(
          (
            result: any,
            // workout: {
            //   metadata: {
            //     title: string;
            //     description: string;
            //     created_by: string;
            //   };
            //   score: number;
            // },
            index: number
          ) => {
            // console.log(
            //   "Math.round(workout.score * 100)",
            //   Math.round(workout.score * 100)
            // );

            console.log("result", result);

            const scoreColor =
              Math.round(result.score * 100) > 80
                ? "text-green-900"
                : Math.round(result.score * 100) > 60
                ? "text-green-600"
                : Math.round(result.score * 100) > 40
                ? "text-orange-400"
                : "text-red-600";

            return (
              <div
                key={index}
                className="border rounded-md p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-bold">
                      {result.metadata.modality}
                    </h5>
                    <span className={scoreColor}>
                      {Math.round(result.score * 100)}%
                    </span>
                  </div>
                  {result?.metadata?.modality === "vision" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      width={"auto"}
                      src={`https://media.kalygo.io/multi-modal/images/${result.metadata.filename}`}
                      alt="media"
                    ></img>
                  ) : (
                    <audio controls style={{ width: "100%", maxWidth: "100%" }}>
                      <source
                        src={`https://media.kalygo.io/multi-modal/audio/${result.metadata.filename}`}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  <p className="text-sm">{result?.metadata?.filename}</p>
                </div>
                <div className="mt-4 text-right">
                  <small>
                    <b>Created by:</b> r@pirate.ai
                  </small>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="text-center">
        <strong>📷 🎵</strong>
        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </div>
  );
}
