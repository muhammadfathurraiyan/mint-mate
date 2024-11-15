import { prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { contract } from "./clients";

export async function mintNFT(tokenURI: string, account: any) {
  try {
    const transaction = prepareContractCall({
      contract,
      method:
        "function mintNFT(address recipient, string tokenURI) returns (uint256)",
      params: [process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!, tokenURI],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });

    return { result: transactionHash };
  } catch (error) {
    return { errorMessage: error };
  }
}
async function getTokenURIs() {
  const totalToken = await readContract({
    contract,
    method: "function _tokenIdCounter() view returns (uint256)",
    params: [],
  });

  const tokenURIs = [];
  for (let i = 0; i <= Number(totalToken) - 1; i++) {
    try {
      const tokenURI = await readContract({
        contract,
        method: "function tokenURI(uint256 tokenId) view returns (string)",
        params: [BigInt(i)],
      });
      tokenURIs.push(tokenURI);
    } catch (error) {
      console.log(`Error fetching tokenURI for tokenId ${i}:`, error);
    }
  }
  return tokenURIs;
}

export async function getNFTs() {
  const tokenURIs = await getTokenURIs();
  const data = await Promise.all(
    tokenURIs.map(async (uri) => {
      try {
        const newUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const response = await fetch(newUri);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(`Error fetching data from URI ${uri}:`, error);
        return null;
      }
    })
  );

  return data
    .filter((e) => e)
    .map((e) => (e.data ? e.data : e))
    .reverse();
}
