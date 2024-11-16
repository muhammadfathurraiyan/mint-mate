"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { client } from "@/lib/clients";
import { Hammer, Home, Image, Menu, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ConnectButton,
  darkTheme,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { ThemeController } from "./ThemeController";

export default function Header() {
  const account = useActiveAccount();
  const router = useRouter();
  const handleNav = (url: string) => {
    if (!account?.address) return toast.error("You need to login first!");
    router.push(url);
  };
  return (
    <header className="flex items-center justify-between lg:px-12 p-4 lg:py-6">
      <div className="flex items-center gap-6 mr-auto">
        <Link href={"/"} className="font-bold text-2xl font-mono">
          Mint<span className="font-light text-primary">Mate</span>
        </Link>
        <Link
          href={"/art"}
          className="text-muted-foreground text-sm hover:text-primary mt-[6px] transition-colors max-lg:hidden"
        >
          Art
        </Link>
        <button
          type="button"
          onClick={() => handleNav("/mint")}
          className="text-muted-foreground text-sm hover:text-primary mt-[6px] transition-colors max-lg:hidden"
        >
          Mint
        </button>
      </div>
      <div className="ml-auto flex items-center gap-2 max-lg:hidden">
        <ThemeController />
        <LoginButton />
      </div>
      <div className="lg:hidden ml-auto">
        <Sidebar handleNav={handleNav} />
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
    },
  });

  const DarkTheme = darkTheme({
    colors: {
      borderColor: "hsl(var(--border))",
      modalBg: "hsl(var(--card))",
      primaryButtonBg: "hsl(var(--primary))",
    },
  });
  return (
    <ConnectButton
      client={client}
      connectButton={{
        label: <ButtonLabel />,
        className: "connect-button",
      }}
      theme={theme === "light" ? LightTheme : DarkTheme}
    />
  );
}

function ButtonLabel() {
  return (
    <>
      <Wallet /> Connect
    </>
  );
}

function Sidebar({
  handleNav,
}: {
  handleNav: (url: string) => string | number | undefined;
}) {
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
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Home size={20} /> Home
            </Link>
            <Link
              href={"/art"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Image size={20} /> Art
            </Link>
            <button
              type="button"
              onClick={() => handleNav("/mint")}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Hammer size={20} /> Mint
            </button>
          </div>
          <div className="flex items-center gap-4 mb-12">
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
