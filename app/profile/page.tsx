import React from "react";
import { getMyPosts, getUser } from "../actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UploadButton } from "../utils/uploadthing";
import UpdateUserImage from "../components/UpdateUserImage";

async function Profile() {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  const posts = await getMyPosts();

  return (
    <div className=" w-full flex justify-center">
      <div className=" w-[750px] min-h-screen">
        <div className=" w-full flex justify-between px-28 py-12">
          <div className=" relative ">
            <Image
              alt="Profile page"
              src={user.image!}
              width={150}
              height={150}
              className=" w-[150px] h-[150px] rounded-full object-cover "
            />
          </div>
          <div className=" flex flex-col gap-y-5">
            <div>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
            </div>

            <UpdateUserImage />
          </div>
        </div>
        <div className=" border-t border-neutral-800 mt-10 overflow-auto h-[440px]">
          <div className=" grid grid-cols-3 place-items-center py-3">
            {posts?.map((post) => {
              return (
                <div className=" w-[200px] h-[200px] ">
                  <Image
                    src={post.imageUrl}
                    alt="Uploaded Image"
                    width={200}
                    height={200}
                    className="  w-full h-full object-cover "
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
