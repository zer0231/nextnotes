

import ConfirmationDialog from "@/components/ConfirmationDialog";
import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { useState } from "react";

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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allNotes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
        {allNotes.length === 0 && (
          <div className="col-span-full text-center">
            {"The Note list is empty"}
          </div>
        )}
      </div>

    
    </>
  );
}
