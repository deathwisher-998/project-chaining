import "./globals.css";
import "react-toastify/dist/ReactToastify.css"; 
import 'keen-slider/keen-slider.min.css';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout, FixedPlugin } from "@/components";
import { Providers } from "./globalstore/provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samdena",
  description:
    "Shop your favourite product now",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={roboto.className}>
        <Providers>
            <Layout>
              {children}
              {/* <FixedPlugin /> */}
            </Layout>
        </Providers>
      </body>
    </html>
  );
}
