"use client";
import Mint from "@/components/Mint";
import { redirect } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

export default function page() {
  const account = useActiveAccount();
  if (!account) return redirect("/");
  return (
    <section className="lg:px-12 px-4 py-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Minting</h2>
        <p className="text-muted-foreground text-sm">
          Fill the form to mint an NFT
        </p>
      </div>
      <Mint />
    </section>
  );
}
