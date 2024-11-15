import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="lg:px-12 px-4 py-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Arts</h2>
        <p className="text-muted-foreground text-sm">
          Export all available NFTs
        </p>
      </div>
      <div className="space-y-4">
        <Skeleton className="lg:w-[400px] h-10 w-full rounded-md" />
        <div className="grid lg:grid-cols-4 gap-4">
          {[..."asdfghjklp"].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
