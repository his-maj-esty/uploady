import { dbManager } from "@/lib/dbServerManager";

export async function POST(req: Request) {
  const db = new dbManager();
  try {
    const { key, downloadLink, deleteLink, email, size, fileType } =
      await req.json();
    const res = await db.addFile({
      email: email,
      key: key,
      size: size,
      fileType: fileType,
      downloadLink: downloadLink,
      deleteLink: deleteLink,
    });
    return Response.json({
      res,
    });
  } catch (err) {
    console.log(err);
    return new Response("failed to add file", { status: 400 });
  }
}
