"use client";
import { useState } from "react";
import { UploadDropzone } from "../utils/uploadthing";
import Image from "next/image";

export default function UploadPost({setImageUrl , imageUrl }: {setImageUrl : any , imageUrl:string | null | undefined}) {
  return (
    <div className=" w-full h-[450px] flex justify-center items-center">
      {!imageUrl ? (
        <div className=" border border-neutral-600 rounded-md size-[450px] flex justify-center ">
          <UploadDropzone
            className=" w-full ut-button:ut-readying:bg-primary/50 ut-label:text-white ut-button:ut-uploading:bg-green-500/50  ut-button:ut-uploading:after:bg-green-500"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
            }}
            endpoint="imageUploader"
            onUploadError={(error: Error) => {
              alert(Error);
            }}
          />
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          width={450}
          height={450}
          className=" rounded-lg w-full object-contain "
        />
      )}
    </div>
  );
}
