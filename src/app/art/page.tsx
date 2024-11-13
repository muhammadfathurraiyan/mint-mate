"use client";
import Arts from "@/components/art/Arts";
import React from "react";
import { defineChain, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { client } from "@/lib/clients";

export default function page() {
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!,
  });
  const { data, isPending } = useReadContract({
    contract,
    method: "function _tokenIdCounter() view returns (uint256)",
    params: [],
  });

  console.log(data);
  return (
    <section className="lg:px-12 px-4 py-3 space-y-20">
      <Arts />
    </section>
  );
}
