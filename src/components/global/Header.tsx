"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { generatePayload, isLoggedIn, login, logout } from "@/lib/auth";
import { client } from "@/lib/client";
import {
  Hammer,
  Home,
  Image,
  Menu,
  Search,
  Shapes,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { ConnectButton, darkTheme, lightTheme } from "thirdweb/react";
import { Input } from "../ui/input";
import { ThemeController } from "./ThemeController";
import { useTheme } from "next-themes";

export default function Header() {
  return (
    <header className="flex items-center justify-between lg:px-12 px-4 py-3">
      <div className="flex items-center gap-6 mr-auto">
        <Link href={"/"} className="font-bold text-2xl font-mono">
          Mint<span className="font-light text-primary">Mate</span>
        </Link>
        <Link
          href={"/"}
          className="text-muted-foreground hover:text-primary mt-1 text-sm transition-colors max-lg:hidden"
        >
          Galery
        </Link>
        <Link
          href={"/"}
          className="text-muted-foreground hover:text-primary mt-1 text-sm transition-colors max-lg:hidden"
        >
          Mint
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2 max-lg:hidden">
        <ThemeController />
        <AuthButton />
      </div>
      <div className="lg:hidden ml-auto">
        <Sidebar />
      </div>
    </header>
  );
}

function AuthButton() {
  const { theme } = useTheme();
  const LightTheme = lightTheme({
    colors: {
      borderColor: "hsl(var(--border))",
      modalBg: "hsl(var(--card))",
    },
  });
  const DarkTheme = darkTheme({
    colors: {
      borderColor: "hsl(var(--border))",
      modalBg: "hsl(var(--card))",
    },
  });
  return (
    <ConnectButton
      connectButton={{ className: "connect-button" }}
      theme={theme === "light" ? LightTheme : DarkTheme}
      client={client}
      auth={{
        isLoggedIn: async (address: any) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params: any) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }: { address: any }) =>
          generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
}

function Sidebar() {
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
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Image size={20} /> Galery
            </Link>
            <Link
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Hammer size={20} /> Mint
            </Link>
            <Link
              href={"/"}
              className="text-muted-foreground hover:text-primary mt-1 transition-colors flex items-center gap-3"
            >
              <Shapes size={20} /> Collection
            </Link>
          </div>
          <div className="flex gap-2 mb-12">
            <div>
              <ThemeController />
            </div>
            <AuthButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
