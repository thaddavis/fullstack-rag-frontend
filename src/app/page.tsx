"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen justify-center items-center p-24 space-y-4">
      <h1 className="text-5xl cursor-pointer">R.A.G. w/ Pinecone</h1>
      <button
        onClick={() => {
          router.push("/agents/rag");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enter
      </button>
    </main>
  );
}
