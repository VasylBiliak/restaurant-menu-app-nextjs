import Header from "@/app/components/layout/Header/Header";
import Footer from "@/app/components/layout/Footer/Footer";
import FloatingMenuButton from "@/app/components/shared/FloatingMenuButton/FloatingMenuButton";
import { MenuProvider } from "@/app/context/MenuContext";
import "./globals.css";

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
        url: "/opengraph-image.jpg",
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
    images: ["/opengraph-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <Header />
          {children}
          <FloatingMenuButton />
          <Footer />
        </MenuProvider>
      </body>
    </html>
  );
}