"use client";
import Arts from "@/components/Art";
import { useNFT } from "@/context/NftContextProvider";
import Loading from "./loading";
import { useEffect } from "react";
import { getNFTs } from "@/lib/action";

export default function page() {
  const context = useNFT();

  if (!context) return "ups something went wrong!";

  if (context.data?.length === 0) return <Loading />;

  const fetchNFT = async () => {
    const nfts: TNft[] = await getNFTs();
    context.setData(nfts);
  };

  useEffect(() => {
    if (context.data?.length === 0) fetchNFT();
  }, []);

  return (
    <section className="lg:px-12 px-4 py-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Arts</h2>
        <p className="text-muted-foreground text-sm">
          Export all available NFTs
        </p>
      </div>
      <Arts />
    </section>
  );
}
