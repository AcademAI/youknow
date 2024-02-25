import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Metrika } from "@/components/YandexMetrica";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Генератор онлайн-курсов с GPT YouKnow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={cn(lexend.className, "antialiased min-h-screen")}
        suppressHydrationWarning={true}
      >
        <Provider>
          <Navbar />
          {children}
          <Toaster />
          <Suspense>
            <Metrika />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
