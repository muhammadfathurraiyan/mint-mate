import Mint from "@/components/Mint";

export default function page() {
  return (
    <section className="lg:px-12 px-4 py-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Minting</h2>
        <p className="text-muted-foreground text-sm">
          Fill the form to mint an NFT
        </p>
      </div>
      <Mint />
    </section>
  );
}
