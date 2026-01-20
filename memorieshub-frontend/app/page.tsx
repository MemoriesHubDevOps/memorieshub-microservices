"use client";

import { ChangeEvent, useState } from "react";
import UploadService from "./services/UploadService";

export default function Home() {
  const [picture, setPictureToUpload] = useState<File>();
  const [path, setPath] = useState<string>();

  const uploadPhotoAsync = async (event : ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.files && event.target.files[0]) {
      setPictureToUpload(event.target.files[0])
      const path = await UploadService.uploadPictureAsync(event.target.files[0])
      setPath(path);
    }
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1>MemoriesHubDevops</h1>
          <h2>Upload a picture !</h2>

          <label
            htmlFor="picture"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Choose the picture you want to upload
          </label>
          <input 
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
            multiple={false}
            className="hidden"
            onChange={uploadPhotoAsync}>
          </input>
          {
            !!picture ?
              <div>
                You uploaded this picture : {picture.name}
                <img alt="Picture" src={path}></img>
              </div>
              :
              <div>No picture selected.</div>
          }
        </main>
      </div>
  );
}
