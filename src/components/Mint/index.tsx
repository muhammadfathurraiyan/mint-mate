"use client";
import { useState } from "react";
import FormInput from "./FormInput";
import FormNav from "./FormNav";

export default function FormSection() {
  const [isStep1, setIsStep1] = useState(true);
  const [isStep2, setIsStep2] = useState(false);
  const [isStep3, setIsStep3] = useState(false);

  return (
    <div className="flex max-lg:flex-col items-start justify-between gap-4">
      <FormNav
        step={[isStep1, setIsStep1, isStep2, setIsStep2, isStep3, setIsStep3]}
      />
      <FormInput
        step={[isStep1, setIsStep1, isStep2, setIsStep2, isStep3, setIsStep3]}
      />
    </div>
  );
}
