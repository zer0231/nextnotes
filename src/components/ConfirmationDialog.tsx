"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ConfirmationDialogProps {
  message: string;
  setDialogResponse: (dialogResponse: number) => void;

  open: boolean;
  setOpen: (open: boolean) => void;
}
// 0-> Initial State
// 1-> True
// 2-> False
export default function ConfirmationDialog({
  message,
  setDialogResponse,
  open,
  setOpen,
}: ConfirmationDialogProps) {
  //   const [yesResponse, setYesResponse] = useState(false);
  async function yesClicked() {
    setDialogResponse(1);
    setOpen(false);
  }

  async function closeDialog() {
    setDialogResponse(2);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogHeader>{message}</DialogHeader>
        {/* {yesResponse && <>Yes is cllicked</>} */}

        <DialogFooter>
          <Button onClick={yesClicked}>Yes</Button>
          <Button onClick={closeDialog}>No</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
