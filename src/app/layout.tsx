import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import {GoogleTagManager} from "@next/third-parties/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouKnow | АкадемИИя",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={cn(lexend.className, "antialiased min-h-screen pt-16")} suppressHydrationWarning={true}>
        <Provider>
          <Navbar />
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}/>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
