import { GlobalProvider } from "@/context/GlobalProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mike",
  description: "Feito com Next.js 15",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
