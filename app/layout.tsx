import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "video-conference App",
  description: "Created with video-conference",
  generator: "video-conference.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
