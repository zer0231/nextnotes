import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenAi: Notes",
};

export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) throw Error("userId undefined");
  const allNotes = await prisma.note.findMany({ where: { userId } }); //Finds notes with the current userId
  return (
    <>
      <div>Notes goes here</div>
      <div>{JSON.stringify(allNotes)}</div>
    </>
  );
}
