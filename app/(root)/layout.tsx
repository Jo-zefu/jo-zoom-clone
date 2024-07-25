import SteamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app",
  icons: "/icons/logo.svg",
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <SteamVideoProvider>{children}</SteamVideoProvider>
    </main>
  );
}

export default RootLayout;
