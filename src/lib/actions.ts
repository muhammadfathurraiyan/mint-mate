"use server";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getNFTs, mintTo } from "thirdweb/extensions/erc721";
import { useSendTransaction } from "thirdweb/react";
import { upload } from "thirdweb/storage";
import { client } from "./clients";

const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!,
});

export async function getNft() {
  try {
    const nfts = await getNFTs({
      contract,
      includeOwners: true,
    });

    return nfts;
  } catch (error) {
    return { errorMessage: error };
  }
}

export async function mintNFT(data: any, account: any) {
  try {
    const transaction = mintTo({
      contract,
      to: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!,
      nft: {
        name: "NFT Name",
        description: "NFT Description",
        image: "https://example.com/image.png",
      },
    });

    const { transactionHash } = await sendTransaction({
      account,
      transaction,
    });

    return { message: transactionHash };
  } catch (error) {
    return { errorMessage: error };
  }
}
