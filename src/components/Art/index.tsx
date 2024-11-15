"use client";
import { useState } from "react";
import { ArtCard } from "./ArtCard";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNFT } from "@/context/NFTContextProvider";

export default function Arts() {
  const context = useNFT();
  const [data, setData] = useState(context?.data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = context?.data?.filter((nft) =>
      nft.name.toLowerCase().includes(searchQuery)
    );
    setData(filteredData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="search">Search :</Label>
        <Input
          id="search"
          onChange={handleSearch}
          placeholder="search..."
          className="lg:w-[400px]"
        />
        <p className="text-muted-foreground text-sm">
          Search your favorite nfts
        </p>
      </div>
      <div className="grid lg:grid-cols-4 max-lg:grid-cols-2 gap-4">
        {data?.map((nft, i) => (
          <ArtCard nft={nft} key={i} />
        ))}
      </div>
    </div>
  );
}
