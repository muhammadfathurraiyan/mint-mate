import MintForm from "@/components/mint/MintForm";
import React from "react";

export default function page() {
  return (
    <section className="lg:px-12 px-4 py-3 space-y-4">
      <div>
        <h2 className="text-2xl font-bold font-mono">Minting</h2>
        <p className="text-muted-foreground text-sm">
          Fill the form to minting NFT
        </p>
      </div>
      <MintForm />
    </section>
  );
}
