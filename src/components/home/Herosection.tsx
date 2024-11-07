import { Send } from "lucide-react";
import { Button } from "../ui/button";

export default function Herosection() {
  return (
    <div className="flex flex-col justify-center min-h-[80vh]">
      <h1 className="font-black text-5xl lg:text-9xl font-mono">
        Create and collect your favorite NFTs
      </h1>
      <p className="text-muted-foreground lg:text-xl">
        Unleash your creativity and bring your digital art to life with
        MintMate.
      </p>
      <Button className="mt-8 w-fit">
        <Send /> Explore
      </Button>
    </div>
  );
}
