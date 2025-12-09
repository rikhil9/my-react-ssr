import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppThemeProvider from "./app-theme-provider";
import Nav from "./nav";

export const metadata: Metadata = {
  title: "Server Component Fundamentals",
  description: "Server Component Fundamentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
