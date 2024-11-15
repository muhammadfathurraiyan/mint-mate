import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="px-4">
      <div className="my-8 h-1 mx-auto w-24 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
      <h3 className="font-bold text-center text-2xl font-mono">
        Mint<span className="font-light text-primary">Mate</span>
      </h3>
      <p className="text-center text-muted-foreground mb-8 text-sm">
        Site design by{" "}
        <Link
          className="hover:text-foreground transition-all text-muted-foreground"
          href={"https://muhammadfathurraiyan.vercel.app"}
        >
          Raiyan.
        </Link>
      </p>
    </footer>
  );
}
