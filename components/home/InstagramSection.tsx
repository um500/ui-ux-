'use client'

import { motion } from 'framer-motion'

const images = [
  '/kids-1.jpg',
  '/mom-1.jpg',
  '/home-1.jpg',
  '/gift-1.jpg',
  '/kids-2.jpg',
  '/mom-2.jpg',
]

export default function InstagramSection() {
  return (
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
          {images.map((img, idx) => (
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
  )
}
