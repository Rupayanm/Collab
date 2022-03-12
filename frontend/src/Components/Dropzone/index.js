import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneInput() {
  const [, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 cursor-pointer h-25 px-5 py-5 m-4 bg-gray-100"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop your profile picture here, or click to select file</p>
      )}
    </div>
  );
}

export default DropzoneInput;
