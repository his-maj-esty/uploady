import { dbManager } from "@/lib/dbServerManager";

export async function POST(req: Request) {
  const db = new dbManager();
  try {
    const { email } = await req.json();
    const res = await db.getFileDetails({email: email});
    return Response.json({
      res,
    });
  } catch (err) {
    console.log(err);
    return new Response("failed to get files for user", { status: 400 });
  }
}
