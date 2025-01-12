"use client";

import { Suspense } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api, type RouterOutputs } from "~/trpc/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getAll"][0];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex flex-row gap-3 border-slate-500">
      <Image
        className="h-14 w-14 rounded-full"
        src={author?.imageUrl ?? "/default-profile.png"}
        width={56}
        height={56}
        alt="user image"
      />
      <div className="flex flex-col">
        <div className="flex font-bold text-slate-400 gap-1">
          <span>{`@${author?.username}`}</span>
          <span className="font-thin">{` . ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

function Posts() {
  const [data] = api.post.getAll.useSuspenseQuery(); // This will use the pre-fetched data

  if (data.length === 0) return <div className="p-8">No posts yet...</div>;

  return (
    <>
      {data.map((fullPost) => (
        <div className="border-b border-slate-400 p-8" key={fullPost.post.id}>
          <PostView {...fullPost}></PostView>
        </div>
      ))}
    </>
  );
}

export function CreatePostWizard() {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-4 ">
      <Image
        className="rounded-full"
        alt="Profile image"
        src={user.user?.imageUrl ?? "/default-profile.png"}
        width={56}
        height={56}
      ></Image>
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
      ></input>
    </div>
  );
}
export default function HomeClient() {
  const user = useUser();

  return (
    <div className="w-full border-x border-slate-400 md:max-w-2xl">
      <div className="flex w-full border-b border-slate-400 p-4">
        {!user.isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {!!user.isSignedIn && (
          <>
            <CreatePostWizard />
            {/* <SignOutButton />{" "} */}
          </>
        )}
      </div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts />
      </Suspense>
    </div>
  );
}
