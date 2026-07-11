import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import ProductionChain from "@/components/ProductionChain";
import Benefits from "@/components/Benefits";
import HyperfixationGrid from "@/components/HyperfixationGrid";
import ConfiscatedGoods from "@/components/ConfiscatedGoods";
import ProcessSteps from "@/components/ProcessSteps";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <Hero />
      <Timeline />
      <ProductionChain />
      <Benefits />
      <HyperfixationGrid />
      <ConfiscatedGoods />
      <ProcessSteps />
      <Footer />
    </main>
  );
}
