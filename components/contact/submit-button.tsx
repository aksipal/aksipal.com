"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  idleLabel: string;
  loadingLabel: string;
};

export function SubmitButton({ idleLabel, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending ? loadingLabel : idleLabel}
    </Button>
  );
}
