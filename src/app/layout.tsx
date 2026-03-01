import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import React from "react";
import CustomCursor from "@/components/CustomCursor";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "พูห์ | นักพัฒนาเว็บไซต์และระบบอัจฉริยะ",
  description: "รับทำเว็บไซต์ระบบซับซ้อน (Web Applications) และเชื่อมต่อ API ทุกรูปแบบ สร้างสรรค์งานคุณภาพพรีเมียม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" style={{ scrollBehavior: "smooth" }}>
      <body className={prompt.className}>
        <ThemeProvider>
          <CustomCursor />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
