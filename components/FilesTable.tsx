"use client";
import { FileDetails } from "@/lib/types";
import prettyBytes from "pretty-bytes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { client } from "@/lib/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { fileState } from "@/recoil-state/filesState";

export function FilesTable({ email }: { email: string }) {
  const [files, setFiles] = useRecoilState(fileState);
  const cl = new client();

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
    getFiles();
  }, []);

  async function deleteObj(link: string, userId: number, fileName: string) {
    try {
      const res = await toast.promise(
        Promise.all([
          axios.delete(link),
          cl.deleteFile({ userId: userId, fileName: fileName }),
        ]),
        {
          loading: "Deleting...",
          success: <b>File deleted successfully!</b>,
          error: <b>Delete failed. Please try again.</b>,
        }
      );

      await getFiles();  // getting updated list of files

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-center">Download</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files ? (
          files.map((file: FileDetails) => (
            <TableRow key={file.key}>
              <TableCell className="font-medium">{file.key}</TableCell>
              <TableCell>{file.fileType.split("/")[1]}</TableCell>
              <TableCell>{prettyBytes(file.size)}</TableCell>
              <TableCell>
                <a href={file.downloadLink} className="flex justify-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 p-1 rounded-sm transition hover:bg-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </a>
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={() =>
                    deleteObj(file.deleteLink, file.userId, file.key)
                  }
                  className="p-1 rounded-sm transition hover:bg-slate-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="font-medium">
              no result
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
