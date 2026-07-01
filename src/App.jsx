import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./pages/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";

//Dropdown Pages //
import DigitalMarketing from "./dropdown/DigitalMarketing";
import WebsiteDesign from "./dropdown/WebsiteDesign";
import ECommerceWebsite from "./dropdown/ECommerceWebsite";
import SoftwareDevelopment from './dropdown/SoftwareDevelopment'

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />

        { /* Dropdown */}
        <Route path="/digitalmarketing" element={<DigitalMarketing />} />
        <Route path="/websitedesign" element={<WebsiteDesign />} />
        <Route path="/ecommercewebsite" element={<ECommerceWebsite />} />
        <Route path="/softwaredevelopement" element={<SoftwareDevelopment />} />

      </Routes>

      

      <Footer />
    </>
  );
}