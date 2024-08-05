"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  useRouter().push("/dashboard/no-rag");

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-center text-5xl font-semibold leading-12">
          &quot;Dashboard&quot;
        </h1>
      </div>
    </div>
  );
}
