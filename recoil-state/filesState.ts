import { FileDetails } from "@/lib/types";
import { atom } from "recoil";

export const fileState = atom<FileDetails[] | []>({
    key: "fileState",
    default: []
});