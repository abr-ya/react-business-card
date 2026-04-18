import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children }: PropsWithChildren) => {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="flex min-h-dvh flex-col bg-linear-to-br from-background to-muted">
      <div className="shrink-0">
        <Header />
      </div>
      <main
        className={cn(
          "container mx-auto flex min-h-0 flex-1 flex-col px-4",
          isHome ? "overflow-hidden py-4" : "overflow-y-auto py-8",
        )}
      >
        {children}
      </main>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
};
