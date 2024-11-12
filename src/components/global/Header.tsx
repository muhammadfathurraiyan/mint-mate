"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ConnectWallet,
  darkTheme,
  lightTheme,
  useWallet,
} from "@thirdweb-dev/react";
import { Hammer, Home, Image, Menu, Shapes, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ThemeController } from "./ThemeController";
import { toast } from "sonner";

export default function Header() {
  const walletInstance = useWallet();
  const handleWallet = () => {
    if (!walletInstance) return toast.error("You need to login first!");
  };
  return (
    <header className="flex items-center justify-between lg:px-12 px-4 py-3">
      <div className="flex items-center gap-6 mr-auto">
        <Link href={"/"} className="font-bold text-2xl font-mono">
          Mint<span className="font-light text-primary">Mate</span>
        </Link>
        <Link
          onClick={handleWallet}
          href={"/"}
          className="text-muted-foreground text-sm hover:text-primary mt-[6px] transition-colors max-lg:hidden"
        >
          Galery
        </Link>
        <Link
          onClick={handleWallet}
          href={"/mint"}
          className="text-muted-foreground text-sm hover:text-primary mt-[6px] transition-colors max-lg:hidden"
        >
          Mint
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2 max-lg:hidden">
        <ThemeController />
        <LoginButton />
      </div>
      <div className="lg:hidden ml-auto">
        <Sidebar />
      </div>
    </header>
  );
}

function LoginButton() {
  const { theme } = useTheme();
  const LightTheme = lightTheme({
    colors: {
      borderColor: "hsl(var(--border))",
      modalBg: "hsl(var(--card))",
      primaryButtonBg: "hsl(var(--primary))",
      primaryButtonText: "hsl(var(--primary-foreground))",
    },
  });

  const DarkTheme = darkTheme({
    colors: {
      borderColor: "hsl(var(--border))",
      modalBg: "hsl(var(--card))",
      primaryButtonBg: "hsl(var(--primary))",
      primaryButtonText: "hsl(var(--primary-foreground))",
    },
  });
  return (
    <ConnectWallet
      btnTitle={"Connect"}
      modalTitle="Sign in"
      className={"connect-button"}
      theme={theme === "light" ? LightTheme : DarkTheme}
    />
  );
}

function Sidebar() {
  const walletInstance = useWallet();
  const handleWallet = () => {
    if (!walletInstance) return toast.error("You need to login first!");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href={"/"} className="font-bold text-2xl font-mono">
              Mint<span className="font-light text-primary">Mate</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col h-full p justify-between">
          <div className="flex flex-col gap-4">
            <Link
              onClick={handleWallet}
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Home size={20} /> Home
            </Link>
            <Link
              onClick={handleWallet}
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Image size={20} /> Galery
            </Link>
            <Link
              onClick={handleWallet}
              href={"/mint"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Hammer size={20} /> Mint
            </Link>
          </div>
          <div className="flex gap-2 mb-12">
            <div>
              <ThemeController />
            </div>
            <LoginButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
