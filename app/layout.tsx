import Header from "@/app/components/layout/Header/Header";
import Footer from "@/app/components/layout/Footer/Footer";
import FloatingMenuButton from "@/app/components/shared/FloatingMenuButton/FloatingMenuButton";
import { MenuProvider } from "@/app/context/MenuContext"; 
import "./globals.css";

export const metadata = {
  title: "Restaurant Landing",
  description: "Modern restaurant website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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