import localFont from "next/font/local";
import "./globals.css";

import Link from "next/link";
import NavBar from "@/components/NavBar";

import { Toaster } from "@/components/ui/toaster";

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

export const metadata = {
  title: "RTX - Computer Parts",
  description: "Find the best computer parts for your next build or upgrade.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-1">{children}</main>

          <footer className="bg-muted mt-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">About RTX</h3>
                  <p className="text-muted-foreground">
                    Your one-stop shop for high-quality computer parts and
                    accessories.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    Email: support@rtx.com
                  </p>
                  <p className="text-muted-foreground">Phone: (123) 456-7890</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Facebook
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Twitter
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center text-muted-foreground">
                © 2023 RTX Computer Parts. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
