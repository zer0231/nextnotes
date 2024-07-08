"use client";

import AddNoteEditDialog from "@/components/AddEditNoteDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";

export default function NavBar() {
  const [showAddEditNoteDialog, setShowEditAddNoteDialog] = useState(false);
const {theme} = useTheme();

  return (
    <>
      <div className="p-4 shadow">
        <div className="max-w-7xl m-auto flex flex-wrap gap-4 items-center justify-between">
          <Link href="/notes" className="flex items-center gap-1">
            {/* <Image src={logo} alt="OpenAi-Notes logo" width={40} height={40}/> */}
            Logo goes here
            <span className="font-bold">OpenAi-Notes</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme:(theme ==="dark"?dark:undefined),
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <ThemeToggleButton/>
            <Button onClick={() => setShowEditAddNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>


      <AddNoteEditDialog
        open={showAddEditNoteDialog}
        setOpen={setShowEditAddNoteDialog}
      />
    </>
  );
}
