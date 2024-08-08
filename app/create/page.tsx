"use client"
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPost } from "../actions";
import { UploadDropzone } from "../utils/uploadthing";
import Image from "next/image";

function Create() {
  const [caption , setCaption] = useState<string |  undefined>() 
  const [imageUrl , setImageUrl] = useState<string | null>() 
  const handlePost = async() => {
  
    if(caption && imageUrl)
      await createPost( {caption,imageUrl})
    else if (imageUrl)
      await createPost({ imageUrl });
    else
      alert("No image selected!")

  }
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-[750px] min-h-screen flex justify-center items-center flex-col gap-y-3">
        <div className=" w-[450px]">
          {/* <UploadPost setImageUrl={setImageUrl} imageUrl={imageUrl}/> */}
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
        </div>
        <Textarea
          className="w-[450px] bg-neutral-800  border-none "
          placeholder="Write your caption here..."
          maxLength={300}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button onClick={handlePost}>Post</Button>
      </div>
    </div>
  );
}

export default Create;
