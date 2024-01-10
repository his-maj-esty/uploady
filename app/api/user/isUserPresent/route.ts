import { dbManager } from "@/lib/dbServerManager";

export async function GET(req: Request) {
  const db = new dbManager();
  try {
    const { email } = await req.json();
    const res = await db.isUserPresent({email: email});
    return Response.json({
      res,
    });
  } catch (err) {
    console.log(err);
    return new Response("failed to get user", { status: 400 });
  }
}
