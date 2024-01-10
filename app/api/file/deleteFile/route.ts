import { dbManager } from "@/lib/dbServerManager";

export async function POST(req: Request) {
  const db = new dbManager();
  try {
    const { fileName, userId } = await req.json();
    const res = await db.deleteFile({ userId: userId, fileName: fileName });
    return Response.json({
      res,
    });
  } catch (err) {
    console.log(err);
    return new Response("failed to add file", { status: 400 });
  }
}
