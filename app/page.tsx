import Hero from "@/app/components/sections/Hero/Hero";
import About from "@/app/components/sections/About/About";
import Intro from "@/app/components/sections/Intro/Intro";
import Chief from "@/app/components/sections/Chef/Chef";
import Menu from "@/app/components/sections/Menu/Menu";
import Gallery from "@/app/components/sections/Gallery/Gallery";
import BookTable from "@/app/components/sections/BookTable/BookTable";

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