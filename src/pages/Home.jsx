import Hero from "@/components/home/Hero";
import AboutCompany from "@/components/home/AboutCompany";
import Leadership from "@/components/home/Leadership";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import QuoteSection from "@/components/home/QuoteSection";
import TeamSection from "@/components/home/TeamSection";
import GetInTouch from "@/components/home/GetInTouch";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCompany />
      <Leadership />
      <FeaturedProjects />
      <FeaturedVideos />
      <QuoteSection />
      <TeamSection />
      <GetInTouch />
    </>
  );
}