"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Image, ListChecks, Send } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type TFormProps = {
  setIsStep1: Dispatch<SetStateAction<boolean>>;
  isStep1: boolean;
  setIsStep2: Dispatch<SetStateAction<boolean>>;
  isStep2: boolean;
  setIsStep3: Dispatch<SetStateAction<boolean>>;
  isStep3: boolean;
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      image?: any;
    },
    any,
    undefined
  >;
};

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (["gif", "png", "jpg", "jpeg", "webp"].includes(fileType!)) return true;
  }
  return false;
}

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  image: z
    .any()
    .refine((file: File) => file, "File is required")
    .refine((file) => checkFileType(file)),
});

export default function MintForm() {
  const [isStep1, setIsStep1] = useState(true);
  const [isStep2, setIsStep2] = useState(false);
  const [isStep3, setIsStep3] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  return (
    <div className="flex items-start justify-between gap-4">
      <FormNav
        setIsStep1={setIsStep1}
        isStep1={isStep1}
        setIsStep2={setIsStep2}
        isStep2={isStep2}
        setIsStep3={setIsStep3}
        isStep3={isStep3}
      />
      <FormInput
        setIsStep1={setIsStep1}
        isStep1={isStep1}
        setIsStep2={setIsStep2}
        isStep2={isStep2}
        setIsStep3={setIsStep3}
        isStep3={isStep3}
        image={image}
        setImage={setImage}
        form={form}
      />
      <FormResult />
    </div>
  );
}

function FormInput({
  setIsStep1,
  isStep1,
  setIsStep2,
  isStep2,
  setIsStep3,
  isStep3,
  form,
  image,
  setImage,
}: TFormProps) {
  const handleClickStep1 = async () => {
    const isValid = await form.trigger(["title", "description"]);
    if (isValid) {
      setIsStep1(!isStep1);
      setIsStep2(!isStep2);
    }
  };

  const handleClickStep2 = async () => {
    const isValid = await form.trigger("image");
    if (isValid) {
      setIsStep2(!isStep2);
      setIsStep3(!isStep3);
    }
  };

  console.log(form.getValues("image"));

  const Forms = {
    step1: () => {
      return (
        <>
          <CardHeader>
            <CardTitle>Step 1</CardTitle>
            <CardDescription>General information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Title</FormLabel>
                  <FormControl>
                    <Input placeholder="steve from mc..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your NFT display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="this is a nft..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your NFT description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="ml-auto"
              type="button"
              onClick={handleClickStep1}
            >
              Next
            </Button>
          </CardFooter>
        </>
      );
    },
    step2: () => {
      return (
        <>
          <CardHeader>
            <CardTitle>Step 2</CardTitle>
            <CardDescription>Image upload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
              <File className="w-12 h-12" />
              <span className="text-sm font-medium text-gray-500">
                Drag and drop an image or click to browse
              </span>
              <span className="text-xs text-gray-500">
                jpg, jpeg, png, gif, webp
              </span>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target?.files?.[0] ?? undefined);
                        setImage(e.target.files?.[0] ?? undefined);
                      }}
                      value={field.value?.name}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your NFT display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={handleClickStep2}
              className="ml-auto"
            >
              Next
            </Button>
          </CardFooter>
        </>
      );
    },
    step3: () => {
      return (
        <>
          <CardHeader>
            <CardTitle>Step 3</CardTitle>
            <CardDescription>Mint NFT</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </>
      );
    },
  };

  return (
    <Card className="flex-1">
      <Form {...form}>
        <form>
          {isStep1 ? (
            <Forms.step1 />
          ) : isStep2 ? (
            <Forms.step2 />
          ) : (
            <Forms.step3 />
          )}
        </form>
      </Form>
    </Card>
  );
}

function FormNav({
  setIsStep1,
  isStep1,
  setIsStep2,
  isStep2,
  setIsStep3,
  isStep3,
}: Partial<TFormProps>) {
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

  const handleClick = (
    state: boolean,
    cb: Dispatch<SetStateAction<boolean>>
  ) => {
    if (setIsStep1 && setIsStep2 && setIsStep3) {
      setIsStep1(false)!;
      setIsStep2(false)!;
      setIsStep3(false)!;
    }
    cb(!state);
  };

  return (
    <div className="max-w-[300px] w-full space-y-2">
      {nav.map(({ info, icon, setState, state }, index) => {
        return (
          <div
            key={index}
            className={`flex items-center gap-4 rounded-md hover:bg-accent p-4 ${
              state ? "bg-accent" : ""
            }`}
            onClick={() => handleClick(state!, setState!)}
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
