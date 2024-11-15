"use client";
import { client } from "@/lib/clients";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { MediaRenderer } from "thirdweb/react";

export default function page() {
  const parameter = useSearchParams();
  const name = parameter.get("name");
  const description = parameter.get("description");
  const image = parameter.get("image");
  if (!name || !description || !image) return notFound();
  return (
    <section className="lg:px-12 px-4 py-4 space-y-8">
      <div className="space-y-4">
        <Link
          href="/art"
          className="flex text-sm items-center gap-2 text-muted-foreground hover:text-foreground transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground text-sm">Detail of {name} NFT</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-[400px] p-4 rounded-md bg-muted/30">
          {image ? (
            <MediaRenderer
              client={client}
              src={image}
              className="mx-auto size-full object-contain group-hover:scale-105 transition-all"
            />
          ) : (
            ""
          )}
        </div>
        <div className="space-y-2 p-6 text-muted-foreground">
          <div className="flex flex-col">
            <span className="text-sm">Name: </span>
            <h3 className="text-foreground font-bold text-xl">{name}</h3>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Desctiption: </span>
            <span className="text-foreground">{description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
