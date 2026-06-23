import dynamic from 'next/dynamic';
import Hero from "@/app/components/sections/Hero/Hero";
import About from "@/app/components/sections/About/About";
import Intro from "@/app/components/sections/Intro/Intro";
import Gallery from "@/app/components/sections/Gallery/Gallery";

// Dynamic imports for code splitting
const Menu = dynamic(() => import('@/app/components/sections/Menu/Menu'));
const Chief = dynamic(() => import('@/app/components/sections/Chef/Chef'));
const BookTable = dynamic(() => import('@/app/components/sections/BookTable/BookTable'));

export default function Page() {
  return (
    <main>
       <Hero />
       <About />
       <Intro />
       <Gallery />
       <Menu />
       <Chief />
       <BookTable />
    </main>
  );
}