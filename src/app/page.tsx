import Image from "next/image";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import WhyChooseUs from "./components/WhyChooseUs";
import Featured from "./components/Featured";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner/>
      <WhyChooseUs/>
      <Featured/>
    </div>
  );
}
