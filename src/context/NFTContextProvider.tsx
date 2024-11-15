"use client";
import { getNFTs } from "@/lib/action";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type NFTContextType = {
  data: TNft[] | undefined;
  setData: Dispatch<SetStateAction<TNft[] | undefined>>;
};

const NFTContext = createContext<NFTContextType | null>(null);

export function NFTContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<TNft[] | undefined>([]);
  return (
    <NFTContext.Provider value={{ data, setData }}>
      {children}
    </NFTContext.Provider>
  );
}

export function useNFT() {
  return useContext(NFTContext);
}
