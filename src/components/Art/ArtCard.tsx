import { client } from "@/lib/clients";
import Link from "next/link";
import { MediaRenderer } from "thirdweb/react";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ArtCard({ nft }: { nft: TNft }) {
  return (
    <Card className="overflow-hidden group h-full">
      <CardHeader className="bg-muted/30 h-[250px] p-6 overflow-hidden">
        <MediaRenderer
          client={client}
          src={nft.image}
          className="mx-auto size-full object-contain group-hover:scale-105 transition-all"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle>{nft.name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px] h-full">
          {nft.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={{
            pathname: `/art/detail`,
            query: {
              name: nft.name,
              description: nft.description,
              image: nft.image,
            },
          }}
          className={buttonVariants({ variant: "outline" })}
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
}
