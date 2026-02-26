import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar onBooking={() => setBookingOpen(true)} />
      <HeroSection onBooking={() => setBookingOpen(true)} />
      <ServicesSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <GallerySection />
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
};

export default Index;
