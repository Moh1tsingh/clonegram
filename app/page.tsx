import { getPosts } from "./actions";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="w-full  bg-black text-white flex justify-center">
      <div className=" w-[40%] overflow-auto max-h-screen flex flex-col items-center">
        {posts.map((post) => {
          return (
            <div className=" p-1 border-b py-2 border-neutral-700 mb-1 ">
              <div className=" flex items-center gap-2 py-2">
                <Image
                  alt="Profile page"
                  src={post.userImage}
                  width={28}
                  height={10}
                  className=" rounded-full"
                />
                <h1 className=" tracking-tight font-medium ">
                  {post.userName}
                </h1>
              </div>
              <Image
                src={post.imageUrl}
                alt="Uploaded Image"
                width={450}
                height={450}
                className=" w-[450px] h-[450px] rounded-sm object-cover   "
              />
              <div className=" flex gap-1 items-center py-1 text-sm">
                <h1 className=" tracking-tight font-medium ">
                  {post.userName}
                </h1>
                <h1 className=" font-light">{post.caption}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
