"use client";

import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";

function Posts() {
  const [data] = api.post.getLatest.useSuspenseQuery(); // This will use the pre-fetched data

  return (
    <>
      {data.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </>
  );
}

export default function HomeClient() {
  const user = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}
