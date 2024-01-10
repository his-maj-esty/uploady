import { dbManager } from "@/lib/dbServerManager";

export async function POST(req: Request) {
    const db = new dbManager();
    try {
        const { firstName, lastName, email } = await req.json();
          console.log(firstName, lastName, email, "from api");

        const res = await db.createUser({ firstName: firstName, lastName: lastName, email: email });
        console.log("user created in api with res ", res);
        return Response.json({
            res,
        });
    }
    catch (err) {
        console.log(err);
        return new Response("failed to create user", {status: 400});
    }
}
