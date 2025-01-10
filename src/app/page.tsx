import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import HomeClient from "./_components/homeClient";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <HomeClient hello={hello}></HomeClient>
    </HydrateClient>
  );
}
