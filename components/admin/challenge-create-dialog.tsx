"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import AdminChallengeCreateForm from "./challenge-create-form";

export default function AdminChallengeCreateDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      aria-label="Create Challenge"
    >
      <DialogTrigger asChild>
        <Button size={"sm"}>Create Challenge</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Challenge</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new challenge.
          </DialogDescription>
        </DialogHeader>
        <AdminChallengeCreateForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
