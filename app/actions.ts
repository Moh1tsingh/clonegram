"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
export async function getPosts() {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
export async function getMyPosts() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return;
  }
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user.id,
    },
  });
  return data;
}

export async function createPost({
  imageUrl,
  caption,
}: {
  imageUrl: string;
  caption?: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return null;
  }
  await prisma.post.create({
    data: {
      userId: user.id,
      imageUrl,
      caption,
      userName: user.name as string,
      userImage: user.image as string,
    },
  });
  return redirect(`/`);
}

export async function updateProfileImage(url:string) {
  const user = await getUser();
  if (!user) {
    return;
  }
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image:url,
    },
  });
  return revalidatePath("/profile");
  
}