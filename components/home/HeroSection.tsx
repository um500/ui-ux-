'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F1E7] pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-0 w-72 h-72 bg-[#A5B37B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#DCCDB8]/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ECE6D8] border border-[#DDD3BE]">
              <Sparkles className="w-4 h-4 text-[#8D9B6A]" />
              <span className="text-sm font-medium text-[#8D9B6A]">
                Handcrafted with Love
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#3B3631]"
              >
                Soft Moments,
                <br />
                <span className="text-[#8D9B6A]">Pure Joy</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="max-w-xl text-lg md:text-xl leading-relaxed text-[#6B645C]"
              >
                Premium handcrafted cotton essentials for your little ones.
                Ethically made, thoughtfully designed for every precious
                moment.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/category/all">
                <button className="group px-8 py-4 rounded-full bg-[#8D9B6A] text-white font-semibold shadow-lg hover:scale-105 hover:bg-[#7C8C59] transition-all duration-300 flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/category/return-gifts">
                <button className="px-8 py-4 rounded-full bg-white border border-[#DDD3BE] text-[#3B3631] font-semibold hover:bg-[#F2ECE2] hover:scale-105 transition-all duration-300">
                  Shop Gifts
                </button>
              </Link>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-8 pt-3"
            >
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow"
                    >
                      <img
                        src={`/mom-${(i % 3) + 1}.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold text-[#3B3631]">10,000+</h4>
                  <p className="text-sm text-[#6B645C]">Happy Families</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 font-semibold text-[#3B3631]">
                  4.9 Rating
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Card */}
            <div className="relative w-full max-w-[500px] rounded-[34px] overflow-hidden bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
              {/* Image */}
              <img
                src="/hero-family.jpg"
                alt="Happy Family"
                className="w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />

              {/* Soft Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#A5B37B]/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
