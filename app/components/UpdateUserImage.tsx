"use client"
import React from 'react'
import { UploadButton } from '../utils/uploadthing';
import {  updateProfileImage } from '../actions';

function UpdateUserImage() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={async(res:any) => {
        await updateProfileImage(res[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}

export default UpdateUserImage