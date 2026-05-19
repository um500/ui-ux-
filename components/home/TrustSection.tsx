'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Truck } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Handcrafted with Love',
    description:
      'Each piece is carefully made by skilled artisans using traditional techniques passed down through generations.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Shield,
    title: '100% Organic Cotton',
    description:
      'We use only certified organic cotton that is gentle on delicate skin and kind to our planet.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Truck,
    title: 'Thoughtful Packaging',
    description:
      'Every order arrives in eco-friendly packaging, ready to gift or keep as a treasured keepsake.',
    color: 'bg-accent/10 text-accent',
  },
]

export default function TrustSection() {
  return (
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
          {features.map((feature, idx) => {
            const Icon = feature.icon
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
