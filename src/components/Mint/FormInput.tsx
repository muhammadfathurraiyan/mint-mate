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
import { FormSchema } from "@/lib/schema";
import { uploadIpfs } from "@/lib/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { File } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getNFTs, mintNFT } from "@/lib/action";
import { useActiveAccount } from "thirdweb/react";
import { useState } from "react";
import Image from "next/image";
import { useNFT } from "@/context/NftContextProvider";
import { Description } from "@radix-ui/react-dialog";

type TForm = UseFormReturn<
  {
    title: string;
    description: string;
    image?: any;
  },
  any,
  undefined
>;

type TMintedNFT = {
  name: string;
  description: string;
  image: any;
  transactionHash: string | undefined;
};

export default function FormInput({ step }: { step: TStep[] }) {
  const [isStep1, setIsStep1, isStep2, setIsStep2, isStep3, setIsStep3] = step;

  const [mintedNFT, setMintedNFT] = useState<TMintedNFT | undefined>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const account = useActiveAccount();
  const context = useNFT();

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast.info("Minting start...");
    try {
      const imageURI = await uploadIpfs(data.image);

      try {
        const tokenURI = await uploadIpfs({
          name: data.title,
          description: data.description,
          image: imageURI,
        });

        const { result, errorMessage } = await mintNFT(tokenURI, account);

        if (errorMessage) throw new Error("Ups something went wrong!");

        toast.success(`Minting sucessfuly`);

        setMintedNFT({
          name: data.title,
          description: data.description,
          image: data.image,
          transactionHash: result,
        });

        if (context) {
          const oldData = context.data;
          context.setData([
            {
              name: data.title,
              description: data.description,
              image: imageURI,
            },
            ...oldData!,
          ]);
        }
      } catch (error) {
        return toast.error(`Error : ${error}`);
      }
    } catch (error) {
      return toast.error(`Error : ${error}`);
    }
  };

  return (
    <Card className="lg:flex-1 max-lg:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {isStep1 ? (
            <StepOne form={form} step={[setIsStep1, setIsStep2]} />
          ) : isStep2 ? (
            <StepTwo form={form} step={[setIsStep2, setIsStep3]} />
          ) : (
            <StepThree
              mintedNFT={mintedNFT}
              step={[setIsStep3, setIsStep1]}
              form={form}
            />
          )}
        </form>
      </Form>
    </Card>
  );
}

function StepOne({ form, step }: { form: TForm; step: TStep[] }) {
  const [setIsStep1, setIsStep2] = step;
  const handleStep = async () => {
    const isValid = await form.trigger(["title", "description"]);
    if (isValid) {
      setIsStep1(false);
      setIsStep2(true);
    }
  };

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
              <FormDescription>This is your NFT display name.</FormDescription>
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
              <FormDescription>This is your NFT description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" type="button" onClick={handleStep}>
          Next
        </Button>
      </CardFooter>
    </>
  );
}

function StepTwo({ form, step }: { form: TForm; step: TStep[] }) {
  const [setIsStep2, setIsStep3] = step;
  const handleStep = async () => {
    const isValid = await form.trigger("image");
    if (isValid) {
      setIsStep2(false);
      setIsStep3(true);
    }
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Step 2</CardTitle>
        <CardDescription>Image upload</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <File className="w-12 h-12" />
          <span className="text-sm font-medium text-center text-muted-foreground">
            Drag and drop an image or click to browse
          </span>
          <span className="text-xs text-center text-muted-foreground">
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
              <FormDescription>This is your NFT image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={handleStep} className="ml-auto">
          Next
        </Button>
      </CardFooter>
    </>
  );
}

function StepThree({
  mintedNFT,
  step,
  form,
}: {
  mintedNFT?: TMintedNFT;
  step: TStep[];
  form: TForm;
}) {
  const image = mintedNFT?.image ? URL.createObjectURL(mintedNFT?.image) : "";
  const [setIsStep3, setIsStep1] = step;
  const handleStep = async () => {
    form.reset();
    setIsStep3(false);
    setIsStep1(true);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Step 3</CardTitle>
        <CardDescription>Mint NFT</CardDescription>
      </CardHeader>
      {mintedNFT && (
        <CardDescription>
          <div className="w-full h-[400px] p-4 rounded-md bg-muted/30">
            {image ? (
              <Image
                src={image}
                alt={"Nft"}
                width={1080}
                height={720}
                className="size-full object-contain"
              />
            ) : (
              ""
            )}
          </div>
          <div className="space-y-2 p-6">
            <div className="flex flex-col">
              <span>Name: </span>
              <span className="text-foreground">{mintedNFT.name}</span>
            </div>
            <div className="flex flex-col">
              <span>Desctiption: </span>
              <span className="text-foreground">{mintedNFT.description}</span>
            </div>
            <div className="flex flex-col">
              <span>Transaction Hash: </span>
              <span className="text-foreground">
                {mintedNFT.transactionHash}
              </span>
            </div>
          </div>
        </CardDescription>
      )}
      <CardFooter>
        {mintedNFT ? (
          <Button
            type="button"
            onClick={handleStep}
            size={"lg"}
            className="w-full"
          >
            Reminting!
          </Button>
        ) : (
          <Button size={"lg"} className="w-full">
            Mint NFT!
          </Button>
        )}
      </CardFooter>
    </>
  );
}
