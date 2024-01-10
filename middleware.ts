import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/file/addFile",
    "/api/user/createUser",
    "/api/user/isUserPresent",
    "/api/file/getFileDetails",
    "/api/file/deleteFile",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(trpc)(.*)"],
};
