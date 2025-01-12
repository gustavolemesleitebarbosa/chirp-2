import { api, HydrateClient } from "~/trpc/server";
import HomeClient from "./_components/homeClient";
export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    // Prefetch the data on the server
    await api.post.getAll.prefetch();
  } catch (error) {
    console.error("Error prefetching posts:", error);
    // Handle the error gracefully, perhaps render an error page
  }

  return (
    <HydrateClient>
      <main  className="flex h-screen justify-center">
        <HomeClient />
      </main>
    </HydrateClient>
  );
}
