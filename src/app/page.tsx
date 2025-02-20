import CategoryEvent from "@/components/category.events";
import CatagoryList from "@/components/category.events";
import FeaturedEvents from "@/components/featured.event";
import Footer from "@/components/footer";
import Carousel from "@/components/hero";
import NearEvent from "@/components/nearest.event";

export default function Home() {
  return (
    <>
      <Carousel />
      <FeaturedEvents />
      <NearEvent />
      {/* <CategoryEvent filterkey="Art" /> */}
      <Footer />
    </>
  );
}
