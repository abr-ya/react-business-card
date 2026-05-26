import type { PropsWithChildren } from "react";

import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-dvh flex-col bg-linear-to-br from-background to-muted">
      <div className="shrink-0">
        <Header />
      </div>
      <main className="container mx-auto flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-8">{children}</main>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
};
