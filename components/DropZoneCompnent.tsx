"use client";
import { FileUpload } from "@/lib/aws-storage";
import { client } from "@/lib/client";
import { fileToBuffer } from "@/lib/fileToBuffer";
import { cn } from "@/lib/utils";
import { fileState } from "@/recoil-state/filesState";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";

function DropZoneComponent({ firstName, lastName, email }: any) {
  
  const setFiles = useSetRecoilState(fileState);
  const cl: any = new client();
  console.log(firstName, lastName, email, "from dropzone");

  async function getFiles() {
    const cl = new client();
    try {
      const res = await cl.getFileDetails({ email: email });
      console.log("res from table", res);
      setFiles(res.res[0].files);
    } catch (error) {
      console.log("Failed to get files for this user");
      return error;
    }
  }

  useEffect(() => {
    async function createuser() {
      try {
        const isUser = await cl.isUserPresent({email: email});
        if (!isUser?.email) {
          const newUser = await cl.createUser({ firstName, lastName, email });
          console.log("new user created ", newUser?.email);
        }
      } catch (error) {
        console.log(error);
      }
    }

    createuser();
  }, []);

  async function onDrop() {
    console.log(acceptedFiles);
    const buffers = await fileToBuffer(acceptedFiles);
    console.log("buffers : ", buffers);

    const uploadObj = new FileUpload();

    buffers.map(async (fileBuffer) => {
      try {
        const [downloadLink, deleteLink] = await toast.promise(
          uploadObj.uploadAndGetURL(fileBuffer, acceptedFiles[0].name),
          {
            loading: "Uploading...",
            success: <b>File uploaded successfully!</b>,
            error: <b>Upload failed. Please try again.</b>,
          }
        );
        console.log(
          "file uploaded successfully and download link is ",
          downloadLink, deleteLink
        );

        const file = await cl.addFile({
          key: acceptedFiles[0].name, downloadLink: downloadLink, deleteLink: deleteLink, email: email, size: acceptedFiles[0].size, fileType: acceptedFiles[0].type
        });
        console.log("file added to db", file);

        await getFiles();
      } catch (error) {
        console.log(error);
      }
    });
  }

  function onDropRejected() {
    toast.error("Please upload jpeg/png file\n(<= 2MB)")
  }

  const {
    acceptedFiles,
    isDragAccept,
    isDragActive,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 1,
    maxSize: 2000000,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop,
    onDropRejected
  });

  return (
    <section>
      <div
        {...getRootProps()}
        className={cn(
          "p-20 m-5 border-2 rounded-xl transition duration-250 hover:bg-blue-500",
          isDragActive ? "border-blue-400" : "",
          isDragAccept ? "border-green-400" : "",
          isDragReject ? "border-red-400" : ""
        )}
      >
        <input {...getInputProps()} />
        <p className="center">
          Drag 'n' drop some files here, or click to select files
        </p>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </section>
  );
}

export default DropZoneComponent;
