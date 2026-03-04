'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const ClosingSection = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="min-h-screen flex flex-col justify-center items-center text-center px-6">
    <motion.h2
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
    >
      The next chapter <br /> starts here.
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-xl md:text-2xl opacity-60 max-w-2xl mb-12"
    >
      We're constantly pushing the boundaries of what's possible.
      New projects, new collaborations, and new ways to innovate.
    </motion.p>
  </div>
));

ClosingSection.displayName = 'ClosingSection';
