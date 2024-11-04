import { Button } from "@/components/ui/button";
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
import { Input } from "../ui/input";
import { ThemeController } from "./ThemeController";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Header() {
  return (
    <header className="grid grid-cols-3 max-lg:grid-cols-2 gap-4 lg:px-12 px-4 py-3">
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
      <div className="max-lg:hidden">
        <InputSearch />
      </div>
      <div className="ml-auto flex items-center gap-2 max-lg:hidden">
        <ThemeController />
        <Button>
          <Wallet /> Connect
        </Button>
      </div>
      <div className="lg:hidden ml-auto flex items-center gap-2">
        <SearchDialog />
        <Sidebar />
      </div>
    </header>
  );
}

function InputSearch() {
  return (
    <div className="relative">
      <Input
        className="pl-8 peer placeholder-muted-foreground"
        placeholder="Search arts"
      />
      <Search className="absolute size-4 top-0 h-full left-3 text-muted-foreground peer-focus:text-foreground transition-colors" />
      <X className="absolute cursor-pointer size-4 top-0 h-full right-3 text-muted-foreground opacity-0 invisible peer-focus:opacity-100 peer-focus:visible transition-all hover:text-foreground" />
    </div>
  );
}

function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Search /> Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md top-28">
        <DialogHeader>
          <DialogTitle className="text-left">Search</DialogTitle>
          <DialogDescription className="text-left">
            Search all availabel nft arts.
          </DialogDescription>
        </DialogHeader>
        <InputSearch />
        <DialogFooter className="flex items-end justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" className="w-fit">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            <Button className="w-full">
              <Wallet /> Disconnect
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
