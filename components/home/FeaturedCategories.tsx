'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  {
    name: 'Bath Linen',
    href: '/category/bath-linen',
    image: '/home-1.jpg',
    color: 'bg-section-bath',
  },
  {
    name: 'Bedding',
    href: '/category/bedding',
    image: '/home-2.jpg',
    color: 'bg-section-bedding',
  },
  {
    name: 'Bags',
    href: '/category/bags',
    image: '/kids-1.jpg',
    color: 'bg-section-bags',
  },
  {
    name: 'Accessories',
    href: '/category/kids-accessories',
    image: '/kids-2.jpg',
    color: 'bg-section-accessories',
  },
  {
    name: 'Clothing',
    href: '/category/clothing',
    image: '/kids-3.jpg',
    color: 'bg-section-clothing',
  },
  {
    name: 'Gifts',
    href: '/category/return-gifts',
    image: '/gift-1.jpg',
    color: 'bg-section-gifts',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
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
  )
}
