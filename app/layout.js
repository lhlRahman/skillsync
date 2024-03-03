import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { FloatingNav } from "@/components/Navbar";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import AlertWrapper from "@/components/AlertWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkillSync",
  description:
    "SkillSync is a platform for finding and posting volunteer jobs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <DataProvider>
        <html lang="en">
          <body className={inter.className}>
            <AlertWrapper />
            <FloatingNav />
            {children}
          </body>
        </html>
      </DataProvider>
    </ClerkProvider>
  );
}
