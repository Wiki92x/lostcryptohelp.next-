'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import WhyUsSection from '@/components/WhyUsSection';
import TokenChecker from '@/components/TokenChecker';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <section id="why-us">
        <WhyUsSection />
      </section>
      <section id="token-checker">
        <TokenChecker />
      </section>
      <Footer />
    </main>
  );
} 