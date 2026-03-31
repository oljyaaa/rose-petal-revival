import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageLoader onDone={() => setLoaded(true)} />

      <main
        className="min-h-screen bg-background"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Navbar onBooking={() => setBookingOpen(true)} />
        <HeroSection onBooking={() => setBookingOpen(true)} />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <GallerySection />
        <Footer />
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      </main>
    </>
  );
};

export default Index;
