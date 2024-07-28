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
  generator: "Next.js",
  applicationName: "YouKnow",
  keywords: [
    "Онлайн курс",
    "Образование",
    "Обучение",
    "ИИ",
    "Генерация",
    "LLM",
    "Online course",
    "Education",
    "AI",
    "Generation",
  ],
  authors: [{ name: "AcademAI", url: "https://academai.ru" }],
  creator: "AcademAI",
  publisher: "AcademAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "yandex-verification": "6c448d754d926e3e",
    "google-site-verification": "3JaVOxAgflJ0Qty-7XJwAz7TYYQqDuK21-YB6LwdVaU",
  },

  title: "YouKnow - платформа для генерации онлайн курсов",
  description:
    "YouKnow от команды AcademAI предоставляет новый подход к онлайн образованию. Генерируйте адаптивные онлайн-курсы с помощью ИИ всего за 2 минуты, пройдите свой учебный трек или разместите его в открытый доступ.",
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
