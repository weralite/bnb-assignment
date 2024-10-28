
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/layout/Header";
import Container from "@/components/common/Container";
import MobileUserMenu from "@/components/navigation/MobileUserMenu"
import { FilterProvider } from "@/context/FilterContext";
import { UserProvider } from "@/context/user";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<UserProvider>
          <FilterProvider>
            <Header />
            <Container>
              {children}
            </Container>
            <MobileUserMenu />
          </FilterProvider>
</UserProvider>
      </body>
    </html >
  );
}
