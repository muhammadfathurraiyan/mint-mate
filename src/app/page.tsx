import Arts from "@/components/home/Arts";
import Herosection from "@/components/home/Herosection";

export default function Page() {
  return (
    <section className="lg:px-12 px-4 py-3 space-y-20">
      <Herosection />
      <Arts />
    </section>
  );
}
