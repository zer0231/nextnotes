import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useState } from "react";

interface AddNoteEditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

export default function AddNoteEditDialog({
  open,
  setOpen,
  noteToEdit,
}: AddNoteEditDialogProps) {
  const [showDialogResponse, setShowDialogResponse] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();
  const noteTitle = noteToEdit?.title || "";
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });
  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });
        if (!response.ok) throw Error("Status code:" + response.status);
      } else {
        //Using api/notes because in the folder structure api/notes we have create route.ts with the post method
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(input),
        });
        if (!response.ok) throw Error("Status code:" + response.status);
        //Clear form field
        form.reset();
      }

      //refresh the page to display the new note allowed only in server components
      router.refresh();
      //close the dialog allowed in client component only and since Dialog is a client component
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong try again");
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;

    setShowDialog(true);
    console.log("The state is changed "+ showDialogResponse);
    
    if (showDialogResponse === 1) {
      console.log(showDialogResponse);
      // setShowDialog(false);
      setDeleteInProgress(true);
      try {
        const response = await fetch("/api/notes", {
          method: "DELETE",
          body: JSON.stringify({ id: noteToEdit.id }),
        });
        if (!response.ok) throw Error("Status code:" + response.status);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Something went wrong.Please try again later");
      } finally {
        setOpen(false);
        setDeleteInProgress(false);
      }
    } else if (showDialogResponse === 2) {
      console.log(showDialogResponse);
      // setShowDialog(false);
     
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note content</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-1 sm:gap-0">
                {/* Add confirmation before deleting */}
                {noteToEdit && (
                  <LoadingButton
                    className="hover:bg-red-500"
                    type="button"
                    onClick={deleteNote}
                    loading={deleteInProgress}
                    disabled={form.formState.isSubmitting}
                  >
                    Delete Note
                  </LoadingButton>
                )}
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                  disabled={deleteInProgress}
                >
                  Submit
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        message={"Are you sure you want to delete ?\n" + noteTitle}
        setDialogResponse={setShowDialogResponse}
        open={showDialog}
        setOpen={setShowDialog}
      />
    </>
  );
}
