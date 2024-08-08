import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../utils/auth";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import Image from "next/image";
import { getUser } from "../actions";

async function Sidebar() {
  const session = await getServerSession(authOptions);
  const user = await getUser();
  return (
    <div className=" w-[240px] min-h-screen border-r border-neutral-800">
      <div className=" w-full py-7">
        <h1 className=" pl-4 text-3xl text-white tracking-tighter font-sans">
          Clonegram
        </h1>
      </div>
      <div className=" pl-4 w-full flex flex-col gap-y-8 mt-6">
        <Link href={"/"} className="flex text-lg font-semibold gap-x-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-7"
          >
            <path
              fill-rule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clip-rule="evenodd"
            />
          </svg>
          Home
        </Link>
        <Link href={"/profile"} className=" flex text-lg font-semibold gap-x-3">
          {user ? (
            <Image
              alt="Profile page"
              src={user.image!}
              width={28}
              height={10}
              className=" size-7 rounded-full object-cover "
            />
          ) : (
            <div className="  rounded-full size-7  border-2"></div>
          )}
          Profile
        </Link>
        <Link href={"/create"} className=" flex text-lg font-semibold gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-7"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Create
        </Link>
        <div className=" pl-2 mt-96 font-semibold text-lg">
          {!session?.user ? <LogInButton /> : <LogOutButton />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
