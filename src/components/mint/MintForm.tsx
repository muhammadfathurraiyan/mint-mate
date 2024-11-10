"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image, ListChecks, Send } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function MintForm() {
  const [isStep1, setIsStep1] = useState(true);
  const [isStep2, setIsStep2] = useState(true);
  const [isStep3, setIsStep3] = useState(true);

  return (
    <div className="flex items-start justify-between gap-4">
      <FormNav
        setIsStep1={setIsStep1}
        isStep1={isStep1}
        setIsStep2={setIsStep2}
        isStep2={isStep2}
        setIsStep3={setIsStep1}
        isStep3={isStep3}
      />
      <FormInput />
      <FormResult />
    </div>
  );
}

function FormInput() {
  return (
    <Card className="flex-1 bg-accent">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

type TFormNavProps = {
  setIsStep1: Dispatch<SetStateAction<boolean>>;
  isStep1: boolean;
  setIsStep2: Dispatch<SetStateAction<boolean>>;
  isStep2: boolean;
  setIsStep3: Dispatch<SetStateAction<boolean>>;
  isStep3: boolean;
};

function FormNav({
  setIsStep1,
  isStep1,
  setIsStep2,
  isStep2,
  setIsStep3,
  isStep3,
}: TFormNavProps) {
  const nav = [
    {
      info: "General info",
      icon: <ListChecks />,
      setState: setIsStep1,
      state: isStep1,
    },
    {
      info: "Image upload",
      icon: <Image />,
      setState: setIsStep2,
      state: isStep2,
    },
    {
      info: "Mint NFT",
      icon: <Send />,
      setState: setIsStep3,
      state: isStep3,
    },
  ];
  return (
    <div className="max-w-[300px] w-full">
      {nav.map(({ info, icon }, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-4 rounded-md hover:bg-accent p-4"
          >
            {icon}
            <div>
              <CardTitle>Step {index + 1}</CardTitle>
              <CardDescription>{info}</CardDescription>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FormResult() {
  return (
    <Card className="max-w-[350px] w-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
