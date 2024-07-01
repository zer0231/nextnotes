import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";

export async function POST_NEW_NOTE(req: Request) {
  try {
    const body = await req.json();
    //Use zod for validation
    //using safeparse to throw our own custom error instead of default
    const parseResult = createNoteSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { title, content } = parseResult.data;
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
    console.log(note);
    return Response.json({ note },{status:201});
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
