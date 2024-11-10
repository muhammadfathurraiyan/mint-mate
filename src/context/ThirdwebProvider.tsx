"use client";

import {
  ThirdwebProvider as Provider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
      activeChain="sepolia"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </Provider>
  );
}
