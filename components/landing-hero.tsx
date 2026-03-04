'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TextScramble } from '@/components/motion-primitives/text-scramble';
import { MemberGrid } from '@/components/member-grid';

export const LandingHero = () => (
  <section className="relative isolate min-h-svh pb-10">
    {/* Full-bleed background image */}
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-svh -z-10 pointer-events-none"
    >
      <div className="relative w-full h-full">
        <img
          src="./haa.jpeg"
          alt=""
          className="w-full h-full object-cover opacity-100 blur-[6px]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/10 to-[#FAF6EF]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#FAF6EF]" />
      </div>
    </motion.div>

    {/* Content */}
    <div className="px-6 md:px-10 max-w-7xl mx-auto pt-24">
      <div className="scale-90 origin-top transition-transform duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col order-1 relative min-h-[70vh] justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextScramble
                className="text-xs font-pixel-grid tracking-[0.2em] bg-black text-white px-2 py-1 mb-6 inline-block"
                duration={1.2}
              >
                We build and craft digital solutions
              </TextScramble>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[6.5rem] leading-[0.85] font-pixel-circle tracking-tight subpixel-antialiased"
            >
              Biust<br /><span className="text-orange-800">Innovation</span><br />Club
            </motion.h1>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-8 order-2 lg:items-end"
          >
            {/* Featured Image */}
            <div className="w-full max-w-[340px] group lg:text-right pt-10">
              <div className="aspect-[3/2] bg-gray-100 rounded-2xl mb-4 overflow-hidden shadow-xl ring-1 ring-black/5">
                <img
                  src="/other.png"
                  alt="Club Activity"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium max-w-[280px] lg:ml-auto">
                Based in Botswana. Driving the future through collaboration and rapid prototyping.
              </p>
            </div>

            {/* Member Grid & Buttons */}
            <div className="flex flex-col gap-6 lg:items-end pt-8">
              <div className="scale-90 origin-left lg:origin-right">
                <MemberGrid />
              </div>

              <div className="flex items-center gap-3">
                <button className="group flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-bold hover:scale-105 transition-all shadow-lg">
                  Join <ArrowUpRight size={16} />
                </button>
                <button className="group border-2 border-black bg-white px-6 py-3 text-sm font-bold hover:bg-black hover:text-white transition-all">
                  Work with us
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  </section>
);
