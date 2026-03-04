'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Footer } from '@/components/footer';
import { LandingHero } from '@/components/landing-hero';
import { WhatWeDo } from '@/components/what-we-do';
import { Executives } from '@/components/executives';
import { ProjectsSection } from '@/components/projects-section';
import { CallToAction } from '@/components/call-to-action';
import { PartnersSlider } from '@/components/partners-slider';
import { PassionStats } from '@/components/passion-stats';
import { ClosingSection } from '@/components/closing-section';

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: lastSectionScroll } = useScroll({
    target: lastSectionRef,
    container: containerRef,
    offset: ['start end', 'center center'],
  });

  const backgroundColor = useTransform(lastSectionScroll, [0, 0.1], ['#FAF6EF', '#363636']);
  const textColor = useTransform(lastSectionScroll, [0, 0.1], ['#000000', '#ffffff']);

  return (
    <motion.div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden selection:bg-black selection:text-white"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="min-h-screen flex flex-col">
        <LandingHero />
      </div>

      <PartnersSlider />

      <main>
        <WhatWeDo />
        <Executives />
        <ProjectsSection />
        <PassionStats />
      </main>

      <CallToAction />

      <ClosingSection ref={lastSectionRef} />

      <Footer />
    </motion.div>
  );
}
