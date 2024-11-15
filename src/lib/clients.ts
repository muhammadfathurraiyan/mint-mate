import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!,
});
