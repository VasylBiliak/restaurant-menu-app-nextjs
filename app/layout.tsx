import Header from "@/app/components/layout/Header/Header";
import Footer from "@/app/components/layout/Footer/Footer";
import FloatingMenuButton from "@/app/components/shared/FloatingMenuButton/FloatingMenuButton";
import GlobalGallery from "@/app/components/ui/GlobalGallery/GlobalGallery";
import { MenuProvider } from "@/app/context/MenuContext";
import { Montserrat, Almendra, Marcellus } from "next/font/google";

import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const almendra = Almendra({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-decorative",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Biliakyn Dining | Restaurant in Toronto",
    template: "%s | Biliakyn Dining",
  },
  description:
    "Experience fine dining in Toronto. Discover our menu, book a table, and enjoy premium cuisine.",
  metadataBase: new URL("https://restaurant-menu-app-nextjs-eqla.vercel.app"),

  openGraph: {
    title: "Biliakyn Dining",
    description: "Experience fine dining in Toronto.",
    url: "https://restaurant-menu-app-nextjs-eqla.vercel.app",
    siteName: "Biliakyn Dining",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Biliakyn Dining",
    description: "Experience fine dining in Toronto.",
    images: ["/android-chrome-512x512.png"],
  },
  facebook: {
    appId: "123456789012345",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Biliakyn Dining Restaurant",
      },
    ],
  },

  linkedin: {
    title: "Biliakyn Dining | Restaurant in Toronto",
    description: "Experience fine dining in Toronto.",
    images: ["/android-chrome-512x512.png"],
  },

  pinterest: {
    title: "Biliakyn Dining | Restaurant in Toronto",
    description: "Discover our menu and premium cuisine in Toronto.",
    images: ["/android-chrome-512x512.png"],
  },

  whatsapp: {
    title: "Biliakyn Dining",
    description: "Fine dining experience in Toronto.",
    images: ["/android-chrome-512x512.png"],
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${marcellus.variable} ${montserrat.variable} ${almendra.variable}`}>
      <body>
        <MenuProvider>
          <Header />
          {children}
          <FloatingMenuButton />
          <Footer />
          <GlobalGallery />
        </MenuProvider>
      </body>
    </html>
  );
}