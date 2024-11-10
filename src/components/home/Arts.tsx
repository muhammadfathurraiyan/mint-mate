"use client";
import {
  useNFTs,
  useContract,
  ThirdwebNftMedia,
  MediaRenderer,
} from "@thirdweb-dev/react";

export default function Arts() {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!
  );
  const { data, isLoading, error } = useNFTs(contract);
  console.log(data);
  return (
    <div>
      <h2 className="text-5xl font-black font-mono">Arts</h2>
      <p className="text-muted-foreground lg:text-xl">
        Explore all available nfts
      </p>
      <div className="grid grid-cols-4 max-lg:grid-cols-3">
        {isLoading && "Loading"}
      </div>
    </div>
  );
}
