import SteamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <SteamVideoProvider>{children}</SteamVideoProvider>
    </main>
  );
}

export default RootLayout;
