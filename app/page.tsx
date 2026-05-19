"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, Heart, Sparkles } from "lucide-react";

// Product data organized by category
const bathLinenProducts = [
  {
    id: "bath-1",
    name: "Premium Hooded Towel Set",
    price: 1299,
    originalPrice: 1799,
    image: "/home-1.jpg",
    category: "Bath Linen",
    rating: 4.9,
  },
  {
    id: "bath-2",
    name: "Organic Cotton Bath Robe",
    price: 1599,
    originalPrice: 2199,
    image: "/home-2.jpg",
    category: "Bath Linen",
    rating: 4.8,
  },
  {
    id: "bath-3",
    name: "Soft Towel Collection",
    price: 899,
    originalPrice: 1299,
    image: "/home-3.jpg",
    category: "Bath Linen",
    rating: 4.7,
  },
  {
    id: "bath-4",
    name: "Baby Bath Essentials Set",
    price: 1999,
    originalPrice: 2599,
    image: "/home-1.jpg",
    category: "Bath Linen",
    rating: 5.0,
  },
];

const beddingProducts = [
  {
    id: "bed-1",
    name: "Handcrafted Baby Quilt",
    price: 2499,
    originalPrice: 3299,
    image: "/home-2.jpg",
    category: "Bedding",
    rating: 4.9,
  },
  {
    id: "bed-2",
    name: "Cotton Dohar Set",
    price: 1899,
    originalPrice: 2499,
    image: "/home-3.jpg",
    category: "Bedding",
    rating: 4.8,
  },
  {
    id: "bed-3",
    name: "Premium Crib Bedding",
    price: 3299,
    originalPrice: 4299,
    image: "/home-1.jpg",
    category: "Bedding",
    rating: 5.0,
  },
  {
    id: "bed-4",
    name: "Layered Comfort Set",
    price: 2199,
    originalPrice: 2899,
    image: "/home-2.jpg",
    category: "Bedding",
    rating: 4.7,
  },
];

const bagsProducts = [
  {
    id: "bag-1",
    name: "Quilted Mini Backpack",
    price: 999,
    originalPrice: 1399,
    image: "/kids-1.jpg",
    category: "Bags",
    rating: 4.8,
  },
  {
    id: "bag-2",
    name: "Organic Cotton Tote",
    price: 799,
    originalPrice: 1099,
    image: "/kids-2.jpg",
    category: "Bags",
    rating: 4.7,
  },
  {
    id: "bag-3",
    name: "Kids Duffel Bag",
    price: 1299,
    originalPrice: 1799,
    image: "/kids-3.jpg",
    category: "Bags",
    rating: 4.9,
  },
  {
    id: "bag-4",
    name: "Fabric Sling Bag",
    price: 699,
    originalPrice: 999,
    image: "/kids-1.jpg",
    category: "Bags",
    rating: 4.6,
  },
];

const accessoriesProducts = [
  {
    id: "acc-1",
    name: "Kids Printed Apron",
    price: 499,
    originalPrice: 699,
    image: "/kids-2.jpg",
    category: "Accessories",
    rating: 4.8,
  },
  {
    id: "acc-2",
    name: "Organic Baby Nest",
    price: 2499,
    originalPrice: 3299,
    image: "/kids-3.jpg",
    category: "Accessories",
    rating: 5.0,
  },
  {
    id: "acc-3",
    name: "Quilted Play Mat",
    price: 1799,
    originalPrice: 2399,
    image: "/kids-1.jpg",
    category: "Accessories",
    rating: 4.9,
  },
  {
    id: "acc-4",
    name: "Cotton Diaper Mat",
    price: 599,
    originalPrice: 899,
    image: "/kids-2.jpg",
    category: "Accessories",
    rating: 4.7,
  },
];

const clothingProducts = [
  {
    id: "cloth-1",
    name: "Organic Cotton Romper",
    price: 799,
    originalPrice: 1099,
    image: "/kids-1.jpg",
    category: "Clothing",
    rating: 4.9,
  },
  {
    id: "cloth-2",
    name: "Hand Block Print Dress",
    price: 1299,
    originalPrice: 1799,
    image: "/kids-2.jpg",
    category: "Clothing",
    rating: 4.8,
  },
  {
    id: "cloth-3",
    name: "Soft Cotton Set",
    price: 999,
    originalPrice: 1399,
    image: "/kids-3.jpg",
    category: "Clothing",
    rating: 4.7,
  },
  {
    id: "cloth-4",
    name: "Premium Sleepwear",
    price: 899,
    originalPrice: 1199,
    image: "/kids-1.jpg",
    category: "Clothing",
    rating: 4.9,
  },
];

const momProducts = [
  {
    id: "mom-1",
    name: "Handcrafted Jhola Bag",
    price: 1499,
    originalPrice: 1999,
    image: "/mom-1.jpg",
    category: "Mom's Corner",
    rating: 4.9,
  },
  {
    id: "mom-2",
    name: "Cotton Canvas Tote",
    price: 1199,
    originalPrice: 1599,
    image: "/mom-2.jpg",
    category: "Mom's Corner",
    rating: 4.8,
  },
  {
    id: "mom-3",
    name: "Soft Face Towel Set",
    price: 599,
    originalPrice: 899,
    image: "/mom-3.jpg",
    category: "Mom's Corner",
    rating: 4.7,
  },
  {
    id: "mom-4",
    name: "Multi Purpose Bag",
    price: 1699,
    originalPrice: 2199,
    image: "/mom-1.jpg",
    category: "Mom's Corner",
    rating: 5.0,
  },
];

const giftProducts = [
  {
    id: "gift-1",
    name: "Premium Baby Hamper",
    price: 4999,
    originalPrice: 6499,
    image: "/gift-1.jpg",
    category: "Return Gifts",
    rating: 5.0,
  },
  {
    id: "gift-2",
    name: "Celebration Gift Box",
    price: 2999,
    originalPrice: 3999,
    image: "/gift-2.jpg",
    category: "Return Gifts",
    rating: 4.9,
  },
  {
    id: "gift-3",
    name: "Curated Party Favors",
    price: 1499,
    originalPrice: 1999,
    image: "/gift-3.jpg",
    category: "Return Gifts",
    rating: 4.8,
  },
  {
    id: "gift-4",
    name: "Custom Gift Set",
    price: 3499,
    originalPrice: 4499,
    image: "/gift-1.jpg",
    category: "Return Gifts",
    rating: 5.0,
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Section */}
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
                <Link href="/shop">
                  <button className="group px-8 py-4 rounded-full bg-[#8D9B6A] text-white font-semibold shadow-lg hover:scale-105 hover:bg-[#7C8C59] transition-all duration-300 flex items-center gap-2">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/gifts">
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
                  className="
        w-full
        h-[320px]
        sm:h-[380px]
        md:h-[450px]
        lg:h-[520px]
        object-cover
        object-center
        hover:scale-105
        transition-transform
        duration-700
      "
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

      {/* Category Quick Links */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Bath Linen",
                href: "/category/bath-linen",
                image: "/home-1.jpg",
                color: "bg-[#E8F2F5]",
              },
              {
                name: "Bedding",
                href: "/category/bedding",
                image: "/home-2.jpg",
                color: "bg-[#E6EDDF]",
              },
              {
                name: "Bags",
                href: "/category/bags",
                image: "/kids-1.jpg",
                color: "bg-[#F0EBE4]",
              },
              {
                name: "Accessories",
                href: "/category/kids-accessories",
                image: "/kids-2.jpg",
                color: "bg-[#F4E8E4]",
              },
              {
                name: "Clothing",
                href: "/category/clothing",
                image: "/kids-3.jpg",
                color: "bg-[#EFE4D3]",
              },
              {
                name: "Gifts",
                href: "/category/return-gifts",
                image: "/gift-1.jpg",
                color: "bg-[#F5EDE0]",
              },
            ].map((cat, idx) => (
              <motion.div key={cat.name} variants={fadeInUp}>
                <Link href={cat.href}>
                  <motion.div
                    className={`${cat.color} rounded-2xl p-4 text-center group cursor-pointer hover:shadow-md transition-all`}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {cat.name}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Bath Linen */}
      <CategorySectionPremium
        title="Bath Linen"
        subtitle="Soft & Fresh"
        description="Breathable, absorbent towels and robes crafted from the finest organic cotton"
        products={bathLinenProducts}
        href="/category/bath-linen"
        bgColor="bg-[#E8F2F5]"
        accentColor="text-[#AFC8D6]"
      />

      {/* Section 2 - Bedding */}
      <CategorySectionPremium
        title="Bedding"
        subtitle="Comfort & Warmth"
        description="Handcrafted quilts and dohars for peaceful slumber and cozy moments"
        products={beddingProducts}
        href="/category/bedding"
        bgColor="bg-[#E6EDDF]"
        accentColor="text-[#8D9B6A]"
      />

      {/* Section 3 - Bags */}
      <CategorySectionPremium
        title="Bags"
        subtitle="Playful Utility"
        description="Quilted cotton bags with charming prints for everyday adventures"
        products={bagsProducts}
        href="/category/bags"
        bgColor="bg-[#F0EBE4]"
        accentColor="text-[#8B6B5C]"
      />

      {/* Section 4 - Kids Accessories */}
      <CategorySectionPremium
        title="Kids Accessories"
        subtitle="Creative Curiosity"
        description="Thoughtfully designed accessories for play, rest, and creative exploration"
        products={accessoriesProducts}
        href="/category/kids-accessories"
        bgColor="bg-[#F4E8E4]"
        accentColor="text-[#C9876B]"
      />

      {/* Section 5 - Clothing */}
      <CategorySectionPremium
        title="Clothing"
        subtitle="Premium Kids Fashion"
        description="Hand block printed dresses and comfortable cotton wear for little ones"
        products={clothingProducts}
        href="/category/clothing"
        bgColor="bg-[#EFE4D3]"
        accentColor="text-[#C49B32]"
      />

      {/* Section 6 - Mom's Corner - Special Emotional Section */}
      <section className="py-20 md:py-28 bg-[#FBF5F2] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#C9876B]/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="/mom-1.jpg"
                  alt="Mother and child moment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-card shadow-lg hidden md:block">
                <img
                  src="/mom-2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="text-sm font-semibold text-[#C9876B] uppercase tracking-wider">
                For the Heart of Home
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Mom&apos;s Corner
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Celebrate the beautiful journey of motherhood with our
                thoughtfully curated collection. Each piece is designed to bring
                warmth, comfort, and a touch of elegance to everyday moments.
              </p>
              <blockquote className="border-l-4 border-[#C9876B] pl-6 py-2 text-foreground italic">
                &ldquo;The smallest things take up the most room in your
                heart.&rdquo;
              </blockquote>
              <Link href="/category/moms-corner">
                <motion.button
                  className="mt-4 px-8 py-4 bg-[#C9876B] text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {momProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 - Return Gifts */}
      <CategorySectionPremium
        title="Return Gifts"
        subtitle="Celebrate in Style"
        description="Premium gift hampers and curated boxes for every special celebration"
        products={giftProducts}
        href="/category/return-gifts"
        bgColor="bg-[#F5EDE0]"
        accentColor="text-[#D4A94D]"
      />

      {/* Trust Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Families Choose LittleBloom
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every product tells a story of care, quality, and sustainable
              practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Handcrafted with Love",
                description:
                  "Each piece is carefully made by skilled artisans using traditional techniques passed down through generations.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Shield,
                title: "100% Organic Cotton",
                description:
                  "We use only certified organic cotton that is gentle on delicate skin and kind to our planet.",
                color: "bg-secondary/20 text-secondary",
              },
              {
                icon: Truck,
                title: "Thoughtful Packaging",
                description:
                  "Every order arrives in eco-friendly packaging, ready to gift or keep as a treasured keepsake.",
                color: "bg-accent/10 text-accent",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-background rounded-3xl p-8 text-center hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instagram / Social Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Follow Our Journey
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              @littlebloom.store
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "/kids-1.jpg",
              "/mom-1.jpg",
              "/home-1.jpg",
              "/gift-1.jpg",
              "/kids-2.jpg",
              "/mom-2.jpg",
            ].map((img, idx) => (
              <motion.div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Premium Category Section Component
function CategorySectionPremium({
  title,
  subtitle,
  description,
  products,
  href,
  bgColor,
  accentColor,
  reversed = false,
}: {
  title: string;
  subtitle: string;
  description: string;
  products: typeof bathLinenProducts;
  href: string;
  bgColor: string;
  accentColor: string;
  reversed?: boolean;
}) {
  return (
    <section className={`py-20 md:py-28 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${reversed ? "md:flex-row-reverse text-right" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={reversed ? "md:text-right" : ""}>
            <span
              className={`text-sm font-semibold ${accentColor} uppercase tracking-wider`}
            >
              {subtitle}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {description}
            </p>
          </div>
          <Link href={href}>
            <motion.button
              className="px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-colors flex items-center gap-2 group whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
