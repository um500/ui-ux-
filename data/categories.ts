export interface Category {
  slug: string
  name: string
  description: string
  image: string
  color: string
  subcategories: string[]
}

export const categories: Category[] = [
  {
    slug: 'bath-linen',
    name: 'Bath Linen',
    description: 'Soft, breathable towels and robes crafted from the finest organic cotton',
    image: '/home-1.jpg',
    color: 'from-[#AFC8D6]/20 to-[#E8F2F5]',
    subcategories: ['Bath Towels', 'Hoodie Towels', 'Bath Robes', 'Towel Sets'],
  },
  {
    slug: 'bedding',
    name: 'Bedding',
    description: 'Handcrafted quilts and dohars for peaceful slumber and cozy moments',
    image: '/home-2.jpg',
    color: 'from-[#7E8B5B]/20 to-[#E6EDDF]',
    subcategories: ['Quilts', 'Dohars', 'Bedding Sets'],
  },
  {
    slug: 'bags',
    name: 'Bags',
    description: 'Quilted cotton bags with charming prints for everyday adventures',
    image: '/kids-1.jpg',
    color: 'from-[#8B6B5C]/20 to-[#F0EBE4]',
    subcategories: ['Backpacks', 'Mini Totes', 'Duffel Bags', 'Sling Bags'],
  },
  {
    slug: 'kids-accessories',
    name: 'Kids Accessories',
    description: 'Thoughtfully designed accessories for play, rest, and creative exploration',
    image: '/kids-2.jpg',
    color: 'from-[#C9876B]/20 to-[#F4E8E4]',
    subcategories: ['Aprons', 'Baby Nest', 'Play Mats', 'Diaper Mats'],
  },
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Hand block printed dresses and comfortable cotton wear for little ones',
    image: '/kids-3.jpg',
    color: 'from-[#D4B15A]/20 to-[#EFE4D3]',
    subcategories: ['Rompers', 'Dresses', 'Co-ord Sets', 'Daily Wear', 'Premium Wear', 'Summer Wear'],
  },
  {
    slug: 'moms-corner',
    name: "Mom's Corner",
    description: 'Thoughtfully curated collection celebrating the beautiful journey of motherhood',
    image: '/mom-1.jpg',
    color: 'from-[#C9876B]/20 to-[#FBF5F2]',
    subcategories: ['Jhola Bags', 'Tote Bags', 'Face Towels', 'Multi Purpose Bags'],
  },
  {
    slug: 'return-gifts',
    name: 'Return Gifts',
    description: 'Premium gift hampers and curated boxes for every special celebration',
    image: '/gift-1.jpg',
    color: 'from-[#D4B15A]/20 to-[#F5EDE0]',
    subcategories: ['Gift Sets', 'Custom Hampers', 'Party Favors'],
  },
]

export const categoryMeta: Record<string, { title: string; description: string; banner: string; color: string }> = {
  'all': {
    title: 'All Products',
    description: 'Discover our complete collection of handcrafted essentials for kids and moms',
    banner: '/home-1.jpg',
    color: 'from-[#7E8B5B]/20 to-[#E6EDDF]',
  },
  'bath-linen': {
    title: 'Bath Linen',
    description: 'Soft, breathable towels and robes crafted from the finest organic cotton',
    banner: '/home-1.jpg',
    color: 'from-[#AFC8D6]/20 to-[#E8F2F5]',
  },
  'bedding': {
    title: 'Bedding',
    description: 'Handcrafted quilts and dohars for peaceful slumber and cozy moments',
    banner: '/home-2.jpg',
    color: 'from-[#7E8B5B]/20 to-[#E6EDDF]',
  },
  'bags': {
    title: 'Bags',
    description: 'Quilted cotton bags with charming prints for everyday adventures',
    banner: '/kids-1.jpg',
    color: 'from-[#8B6B5C]/20 to-[#F0EBE4]',
  },
  'kids-accessories': {
    title: 'Kids Accessories',
    description: 'Thoughtfully designed accessories for play, rest, and creative exploration',
    banner: '/kids-2.jpg',
    color: 'from-[#C9876B]/20 to-[#F4E8E4]',
  },
  'clothing': {
    title: 'Clothing',
    description: 'Hand block printed dresses and comfortable cotton wear for little ones',
    banner: '/kids-3.jpg',
    color: 'from-[#D4B15A]/20 to-[#EFE4D3]',
  },
  'moms-corner': {
    title: "Mom's Corner",
    description: 'Thoughtfully curated collection celebrating the beautiful journey of motherhood',
    banner: '/mom-1.jpg',
    color: 'from-[#C9876B]/20 to-[#FBF5F2]',
  },
  'return-gifts': {
    title: 'Return Gifts',
    description: 'Premium gift hampers and curated boxes for every special celebration',
    banner: '/gift-1.jpg',
    color: 'from-[#D4B15A]/20 to-[#F5EDE0]',
  },
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getCategoryMeta(slug: string) {
  return categoryMeta[slug] || categoryMeta['all']
}
