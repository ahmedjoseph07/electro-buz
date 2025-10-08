import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";
import Featured from "./components/Featured";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner/>
      <WhyChooseUs/>
      <Featured/>
      <Testimonials/>
    </div>
  );
}
