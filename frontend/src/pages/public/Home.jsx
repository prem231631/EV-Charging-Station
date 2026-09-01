import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import HowItWorks from "../../components/home/HowItWorks";
import Features from "../../components/home/Features";
import PopularStations from "../../components/home/PopularStations";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import CTA from "../../components/home/CTA";
import Footer from "../../components/home/Footer";

function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <HowItWorks />
                <Features />
                <PopularStations />
                <WhyChooseUs />
                <CTA />
            </main>

            <Footer />
        </>
    );
}

export default Home;