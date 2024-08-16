"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WorkoutCard } from "@/components/shared/ui/workout-card";
import { InfiniteScroller } from "@/components/shared/ui/infinite-scroller";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export function AnomalyDetectionContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  // @ts-ignore
  const fetchAccountLogins = async ({ pageParam }) => {
    console.log("pageParam", pageParam);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/logins/?cursor=` + pageParam,
      {
        method: "GET",
        credentials: "include",
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
    queryKey: ["logins"],
    queryFn: fetchAccountLogins,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      if (lastPage.cursor >= 160) {
        return null;
      } else {
        return lastPage.cursor;
      }
    },
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      fetchAccountLogins({ pageParam: 0 });
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Logins
          </h1>
          <p className="mt-2 text-sm text-gray-700">All your logins</p>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <InfiniteScroller
          fetchNextPage={handleFetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          loadingMessage={<p>Loading...</p>}
          endingMessage={<p></p>}
        >
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Account ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  IP address
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data?.pages?.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.results?.map(
                    (login: {
                      id: number;
                      account_id: number;
                      ip_address: string;
                      created_at: string;
                      similarity_score: number;
                    }) => (
                      <tr key={login.id}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                          {login.account_id}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">IP address</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {login.ip_address}
                            </dd>
                            <dt className="sr-only sm:hidden">Created at</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {login.created_at}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {login.ip_address}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {login.created_at}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {login.similarity_score}&nbsp;
                          {login.similarity_score < 0.6 ? "🏴‍☠️" : ""}
                        </td>
                      </tr>
                    )
                  )}
                </React.Fragment>
              ))}

              {/* {people.map((person) => (
                <tr key={person.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    {person.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Title</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {person.title}
                      </dd>
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {person.email}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {person.title}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {person.role}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </InfiniteScroller>
      </div>

      {/* <ul role="list" className="divide-y divide-gray-100">
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
                {group?.map(
                  (login: {
                    id: number;
                    account_id: number;
                    ip_address: string;
                    created_at: string;
                    is_suspicious: boolean;
                  }) => (
                    <li
                      key={login.id}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {login.account_id}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {login.ip_address}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {login.is_suspicious}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen{" "}
                          <time dateTime={login.created_at}>
                            {login.created_at}
                          </time>
                        </p>
                      </div>
                    </li>
                  )
                )}
              </React.Fragment>
            ))}
          </>
        </InfiniteScroller>
      </ul> */}
    </>
  );
}
