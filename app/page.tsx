import About from "./_components/About";
import Clothes from "./_components/Clothes";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col menu_class">
      <Hero/>
      <About/>
      <Clothes/>
    </div>
  );
}
