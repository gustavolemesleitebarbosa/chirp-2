import { api, HydrateClient } from "~/trpc/server";
import HomeClient from "./_components/homeClient";
export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    // Prefetch the data on the server
    await api.post.getLatest.prefetch();
  } catch (error) {
    console.error("Error prefetching posts:", error);
    // Handle the error gracefully, perhaps render an error page
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-12">
          <HomeClient />
        </div>
      </main>
    </HydrateClient>
  );
}
