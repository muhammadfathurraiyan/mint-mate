import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Page() {
  return (
    <section className="lg:px-12 px-4 py-4 space-y-20">
      <div className="flex flex-col justify-center gap-2 min-h-[80vh]">
        <h1 className="font-black lg:text-7xl text-5xl font-mono lg:w-[80%] flex flex-col">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted">
            Create and mint
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted">
            your favorite NFTs
          </span>
        </h1>
        <p className="text-muted-foreground">
          Unleash your creativity and bring your digital art to life with
          MintMate.
        </p>
        <Button className="mt-4 w-fit">
          <Send /> Explore
        </Button>
      </div>
    </section>
  );
}
