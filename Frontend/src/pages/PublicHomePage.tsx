import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProductsSection } from '../components/ProductsSection';
import { SoftwareSolutionsSection } from '../components/SoftwareSolutionsSection';
import { CloudSolutionsSection } from '../components/CloudSolutionsSection';
import { AcademicSolutionsSection } from '../components/AcademicSolutionsSection';
import { OurStorySection } from '../components/OurStorySection';
import { LifeAtRequinSection } from '../components/LifeAtRequinSection';
import { QuizCTA } from '../components/QuizCTA';
import { QuizModal } from '../components/QuizModal';
import { ContactSection } from '../components/ContactSection';
import { LoginModal } from '../components/LoginModal';
import { ChatWidget } from '../components/ChatWidget';
import { Footer } from '../components/Footer';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { ServiceItem, ProductItem } from '../data/requinData';

interface PublicHomePageProps {
  initialScrollTo?: string;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ initialScrollTo }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (initialScrollTo) {
      setTimeout(() => scrollToSection(initialScrollTo), 100);
    } else if (location.hash) {
      const hashId = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(hashId), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [initialScrollTo, location.hash]);

  return (
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      {/* Lightweight Sticky Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section: Realistic Software Composition */}
        <Hero
          onExploreServices={() => scrollToSection('services')}
          onViewProducts={() => scrollToSection('products')}
        />

        {/* Services Section: Visually Rich White Cards with Subtle Hover */}
        <ServicesSection onSelectService={(service) => setSelectedService(service)} />

        {/* Experience Section: Visual Storytelling Layout */}
        <ExperienceSection onLearnMore={() => scrollToSection('our-story')} />

        {/* Products Section: High-Fidelity Software Suite Showcase */}
        <ProductsSection onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* Software Solutions: Image-First Portfolio Showcase */}
        <SoftwareSolutionsSection />

        {/* Cloud Solutions: Editorial Split Layout */}
        <CloudSolutionsSection onConsultation={() => scrollToSection('contact')} />

        {/* Academic Solutions: Lighter Editorial Cards */}
        <AcademicSolutionsSection />

        {/* Our Story: Editorial Timeline */}
        <OurStorySection />

        {/* Life at Requin: Prominent Photo Gallery */}
        <LifeAtRequinSection />

        {/* Quiz CTA: Abstract Cyan/Blue Visual */}
        <QuizCTA onStartQuiz={() => setIsQuizOpen(true)} />

        {/* Contact Section: Office Info & Beautiful Clean White Card Form */}
        <ContactSection />
      </main>

      {/* Dark Navy Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Modals & Interactive Overlays */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={(serviceId) => {
          setIsQuizOpen(false);
          scrollToSection('contact');
        }}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={(title) => {
          setSelectedService(null);
          scrollToSection('contact');
        }}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestDemo={(title) => {
          setSelectedProduct(null);
          scrollToSection('contact');
        }}
      />

      {/* Real-Time Floating Chat Assistant Widget */}
      <ChatWidget />
    </div>
  );
};
