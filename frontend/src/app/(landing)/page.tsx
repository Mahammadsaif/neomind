import Hero from "./Hero";
import HowItWorks from "./HowItWorks";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <HowItWorks />
    </div>
  );
}