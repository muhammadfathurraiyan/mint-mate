"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { client } from "@/lib/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { File, Image as IImage, ListChecks, Send } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { mintTo } from "thirdweb/extensions/erc721";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type TFormProps = {
  setIsStep1: Dispatch<SetStateAction<boolean>>;
  isStep1: boolean;
  setIsStep2: Dispatch<SetStateAction<boolean>>;
  isStep2: boolean;
  setIsStep3: Dispatch<SetStateAction<boolean>>;
  isStep3: boolean;
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

const FormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be no more than 50 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(100, "Description must be no more than 100 characters"),
  image: z.any().refine((file) => file !== null, "Image not found"),
});

export default function MintForm() {
  const [isStep1, setIsStep1] = useState(true);
  const [isStep2, setIsStep2] = useState(false);
  const [isStep3, setIsStep3] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
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
        form={form}
      />
      <FormResult form={form} isStep1={isStep1} isStep2={isStep2} />
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
}: TFormProps) {
  const handleClickStep1 = async () => {
    const isValid = await form.trigger(["title", "description"]);
    if (isValid) {
      setIsStep1(false);
      setIsStep2(true);
    }
  };

  const handleClickStep2 = async () => {
    const isValid = await form.trigger("image");
    if (isValid) {
      setIsStep2(false);
      setIsStep3(true);
    }
  };

  const Forms = useMemo(
    () => ({
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
        const imageData = form.getValues("image");
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2</CardTitle>
              <CardDescription>Image upload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                <File className="w-12 h-12" />
                <span className="text-sm font-medium text-center text-gray-500">
                  {imageData?.name ||
                    "Drag and drop an image or click to browse"}
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
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
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
              <Button size={"lg"} className="w-full">
                Mint NFT!
              </Button>
            </CardContent>
          </>
        );
      },
    }),
    []
  );

  const account = useActiveAccount();

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await mint
  };

  return (
    <Card className="flex-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
      icon: <IImage />,
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

function FormResult({ isStep1, isStep2, form }: Partial<TFormProps>) {
  const title = form?.getValues("title");
  const description = form?.getValues("description");
  const image = form?.getValues("image");
  const imageUrl = image ? URL.createObjectURL(image) : "";
  return (
    <Card className="max-w-[350px] w-full overflow-hidden">
      <CardHeader className="bg-accent/30">
        <CardTitle>Preview</CardTitle>
        <CardDescription>Preview nft card</CardDescription>
      </CardHeader>
      <div className="border-b w-full"></div>
      <CardContent className="pt-6">
        <div className="max-w-[350px] group w-full space-y-4">
          <div className="w-full p-6 bg-accent/30 group-hover:bg-accent transition-all h-[200px] rounded-md">
            {image ? (
              <Image
                src={imageUrl}
                alt={image?.name || "Uploaded image"}
                width="1080"
                height="720"
                className="size-full object-contain"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <h1 className="font-bold text-xl">{!isStep1 && title}</h1>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {!isStep1 && description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
