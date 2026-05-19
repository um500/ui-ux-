export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  rating: number
  isNew?: boolean
  isBestseller?: boolean
  description?: string
  sizes?: string[]
  colors?: { name: string; hex: string }[]
}

// All products organized by main category
export const allProducts: Product[] = [
  // Bath Linen
  { id: 'bath-1', name: 'Premium Hooded Towel Set', price: 1299, originalPrice: 1799, image: '/home-1.jpg', category: 'Bath Linen', subcategory: 'Bath Towels', rating: 4.9, isBestseller: true, sizes: ['S', 'M', 'L'], colors: [{ name: 'Sage', hex: '#7E8B5B' }, { name: 'Ivory', hex: '#F8F2E8' }] },
  { id: 'bath-2', name: 'Organic Cotton Bath Robe', price: 1599, originalPrice: 2199, image: '/home-2.jpg', category: 'Bath Linen', subcategory: 'Bath Robes', rating: 4.8, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Sage', hex: '#7E8B5B' }] },
  { id: 'bath-3', name: 'Soft Towel Collection', price: 899, originalPrice: 1299, image: '/home-3.jpg', category: 'Bath Linen', subcategory: 'Towel Sets', rating: 4.7, isNew: true },
  { id: 'bath-4', name: 'Baby Bath Essentials Set', price: 1999, originalPrice: 2599, image: '/home-1.jpg', category: 'Bath Linen', subcategory: 'Towel Sets', rating: 5.0 },
  { id: 'bath-5', name: 'Hoodie Towel - Ocean Blue', price: 799, originalPrice: 1099, image: '/home-2.jpg', category: 'Bath Linen', subcategory: 'Hoodie Towels', rating: 4.8, colors: [{ name: 'Ocean Blue', hex: '#AFC8D6' }] },
  { id: 'bath-6', name: 'Embroidered Bath Robe', price: 1899, originalPrice: 2499, image: '/home-3.jpg', category: 'Bath Linen', subcategory: 'Bath Robes', rating: 4.9 },
  { id: 'bath-7', name: 'Hand Towel Set - Sage', price: 499, originalPrice: 699, image: '/home-1.jpg', category: 'Bath Linen', subcategory: 'Towel Sets', rating: 4.6 },
  { id: 'bath-8', name: 'Baby Washcloth Bundle', price: 399, originalPrice: 599, image: '/home-2.jpg', category: 'Bath Linen', subcategory: 'Bath Towels', rating: 4.7, isNew: true },

  // Bedding
  { id: 'bed-1', name: 'Handcrafted Baby Quilt', price: 2499, originalPrice: 3299, image: '/home-2.jpg', category: 'Bedding', subcategory: 'Quilts', rating: 4.9, isBestseller: true },
  { id: 'bed-2', name: 'Cotton Dohar Set', price: 1899, originalPrice: 2499, image: '/home-3.jpg', category: 'Bedding', subcategory: 'Dohars', rating: 4.8 },
  { id: 'bed-3', name: 'Premium Crib Bedding', price: 3299, originalPrice: 4299, image: '/home-1.jpg', category: 'Bedding', subcategory: 'Bedding Sets', rating: 5.0 },
  { id: 'bed-4', name: 'Layered Comfort Set', price: 2199, originalPrice: 2899, image: '/home-2.jpg', category: 'Bedding', subcategory: 'Bedding Sets', rating: 4.7, isNew: true },
  { id: 'bed-5', name: 'Block Print Quilt', price: 2799, originalPrice: 3599, image: '/home-3.jpg', category: 'Bedding', subcategory: 'Quilts', rating: 4.9 },
  { id: 'bed-6', name: 'Summer Dohar - Floral', price: 1599, originalPrice: 2099, image: '/home-1.jpg', category: 'Bedding', subcategory: 'Dohars', rating: 4.8 },
  { id: 'bed-7', name: 'Nursery Blanket Set', price: 1299, originalPrice: 1799, image: '/home-2.jpg', category: 'Bedding', subcategory: 'Bedding Sets', rating: 4.7 },
  { id: 'bed-8', name: 'Organic Crib Sheet', price: 899, originalPrice: 1199, image: '/home-3.jpg', category: 'Bedding', subcategory: 'Bedding Sets', rating: 4.6, isNew: true },

  // Bags
  { id: 'bag-1', name: 'Quilted Mini Backpack', price: 999, originalPrice: 1399, image: '/kids-1.jpg', category: 'Bags', subcategory: 'Backpacks', rating: 4.8, isBestseller: true, colors: [{ name: 'Sage', hex: '#7E8B5B' }, { name: 'Blush', hex: '#F4E8E4' }] },
  { id: 'bag-2', name: 'Organic Cotton Tote', price: 799, originalPrice: 1099, image: '/kids-2.jpg', category: 'Bags', subcategory: 'Mini Totes', rating: 4.7 },
  { id: 'bag-3', name: 'Kids Duffel Bag', price: 1299, originalPrice: 1799, image: '/kids-3.jpg', category: 'Bags', subcategory: 'Duffel Bags', rating: 4.9, isNew: true },
  { id: 'bag-4', name: 'Fabric Sling Bag', price: 699, originalPrice: 999, image: '/kids-1.jpg', category: 'Bags', subcategory: 'Sling Bags', rating: 4.6 },
  { id: 'bag-5', name: 'Animal Print Backpack', price: 1199, originalPrice: 1599, image: '/kids-2.jpg', category: 'Bags', subcategory: 'Backpacks', rating: 4.8 },
  { id: 'bag-6', name: 'Lunch Tote - Sage', price: 599, originalPrice: 899, image: '/kids-3.jpg', category: 'Bags', subcategory: 'Mini Totes', rating: 4.7 },
  { id: 'bag-7', name: 'Weekend Duffel Bag', price: 1599, originalPrice: 2099, image: '/kids-1.jpg', category: 'Bags', subcategory: 'Duffel Bags', rating: 4.9 },
  { id: 'bag-8', name: 'Crossbody Bag - Floral', price: 799, originalPrice: 1099, image: '/kids-2.jpg', category: 'Bags', subcategory: 'Sling Bags', rating: 4.6, isNew: true },

  // Kids Accessories
  { id: 'acc-1', name: 'Kids Printed Apron', price: 499, originalPrice: 699, image: '/kids-2.jpg', category: 'Kids Accessories', subcategory: 'Aprons', rating: 4.8 },
  { id: 'acc-2', name: 'Organic Baby Nest', price: 2499, originalPrice: 3299, image: '/kids-3.jpg', category: 'Kids Accessories', subcategory: 'Baby Nest', rating: 5.0, isBestseller: true },
  { id: 'acc-3', name: 'Quilted Play Mat', price: 1799, originalPrice: 2399, image: '/kids-1.jpg', category: 'Kids Accessories', subcategory: 'Play Mats', rating: 4.9, isNew: true },
  { id: 'acc-4', name: 'Cotton Diaper Mat', price: 599, originalPrice: 899, image: '/kids-2.jpg', category: 'Kids Accessories', subcategory: 'Diaper Mats', rating: 4.7 },
  { id: 'acc-5', name: 'Chef Apron Set', price: 699, originalPrice: 999, image: '/kids-3.jpg', category: 'Kids Accessories', subcategory: 'Aprons', rating: 4.8 },
  { id: 'acc-6', name: 'Portable Baby Nest', price: 2199, originalPrice: 2899, image: '/kids-1.jpg', category: 'Kids Accessories', subcategory: 'Baby Nest', rating: 4.9 },
  { id: 'acc-7', name: 'Activity Play Mat', price: 2099, originalPrice: 2799, image: '/kids-2.jpg', category: 'Kids Accessories', subcategory: 'Play Mats', rating: 4.8 },
  { id: 'acc-8', name: 'Waterproof Diaper Mat', price: 799, originalPrice: 1099, image: '/kids-3.jpg', category: 'Kids Accessories', subcategory: 'Diaper Mats', rating: 4.6, isNew: true },

  // Mom's Corner
  { id: 'mom-1', name: 'Handcrafted Jhola Bag', price: 1499, originalPrice: 1999, image: '/mom-1.jpg', category: "clothing", subcategory: 'Jhola Bags', rating: 4.9, isBestseller: true },
  { id: 'mom-2', name: 'Cotton Canvas Tote', price: 1199, originalPrice: 1599, image: '/mom-2.jpg', category: "clothing", subcategory: 'Tote Bags', rating: 4.8 },
  { id: 'mom-3', name: 'Soft Face Towel Set', price: 599, originalPrice: 899, image: '/mom-3.jpg', category: "clothing", subcategory: 'Face Towels', rating: 4.7, isNew: true },
  { id: 'mom-4', name: 'Multi Purpose Bag', price: 1699, originalPrice: 2199, image: '/mom-1.jpg', category: "clothing", subcategory: 'Multi Purpose Bags', rating: 5.0 },
  { id: 'mom-5', name: 'Block Print Jhola', price: 1699, originalPrice: 2199, image: '/mom-2.jpg', category: "clothing", subcategory: 'Jhola Bags', rating: 4.9 },
  { id: 'mom-6', name: 'Large Canvas Tote', price: 1399, originalPrice: 1899, image: '/mom-3.jpg', category: "clothing", subcategory: 'Tote Bags', rating: 4.8 },
  { id: 'mom-7', name: 'Spa Towel Collection', price: 799, originalPrice: 1099, image: '/mom-1.jpg', category: "clothing", subcategory: 'Face Towels', rating: 4.7 },
  { id: 'mom-8', name: 'Travel Organizer Bag', price: 1899, originalPrice: 2499, image: '/mom-2.jpg', category: "clothing", subcategory: 'Multi Purpose Bags', rating: 4.9, isNew: true },

  // Bedding
  // Clothing
{
  id: 'cloth-1',
  name: 'Organic Baby Romper',
  price: 899,
  originalPrice: 1299,
  image: '/kids-1.jpg',
  category: 'Clothing',
  subcategory: 'Rompers',
  rating: 4.8,
  isBestseller: true,
},

{
  id: 'cloth-2',
  name: 'Soft Cotton Dress',
  price: 1199,
  originalPrice: 1599,
  image: '/kids-2.jpg',
  category: 'Clothing',
  subcategory: 'Dresses',
  rating: 4.7,
},

{
  id: 'cloth-3',
  name: 'Printed Co-ord Set',
  price: 1499,
  originalPrice: 1999,
  image: '/kids-3.jpg',
  category: 'Clothing',
  subcategory: 'Co-ord Sets',
  rating: 4.9,
  isNew: true,
},

{
  id: 'cloth-4',
  name: 'Everyday Cotton Wear',
  price: 799,
  originalPrice: 1099,
  image: '/kids-1.jpg',
  category: 'Clothing',
  subcategory: 'Daily Wear',
  rating: 4.6,
},

{
  id: 'cloth-5',
  name: 'Premium Kids Outfit',
  price: 1799,
  originalPrice: 2299,
  image: '/kids-2.jpg',
  category: 'Clothing',
  subcategory: 'Premium Wear',
  rating: 5.0,
},

{
  id: 'cloth-6',
  name: 'Summer Cotton Set',
  price: 999,
  originalPrice: 1399,
  image: '/kids-3.jpg',
  category: 'Clothing',
  subcategory: 'Summer Wear',
  rating: 4.8,
},

  // Return Gifts
  { id: 'gift-1', name: 'Premium Baby Hamper', price: 4999, originalPrice: 6499, image: '/gift-1.jpg', category: 'Return Gifts', subcategory: 'Gift Sets', rating: 5.0, isBestseller: true },
  { id: 'gift-2', name: 'Celebration Gift Box', price: 2999, originalPrice: 3999, image: '/gift-2.jpg', category: 'Return Gifts', subcategory: 'Custom Hampers', rating: 4.9 },
  { id: 'gift-3', name: 'Curated Party Favors', price: 1499, originalPrice: 1999, image: '/gift-3.jpg', category: 'Return Gifts', subcategory: 'Party Favors', rating: 4.8, isNew: true },
  { id: 'gift-4', name: 'Custom Gift Set', price: 3499, originalPrice: 4499, image: '/gift-1.jpg', category: 'Return Gifts', subcategory: 'Gift Sets', rating: 5.0 },
  { id: 'gift-5', name: 'Newborn Welcome Kit', price: 3999, originalPrice: 5299, image: '/gift-2.jpg', category: 'Return Gifts', subcategory: 'Gift Sets', rating: 4.9 },
  { id: 'gift-6', name: 'Birthday Hamper', price: 2499, originalPrice: 3299, image: '/gift-3.jpg', category: 'Return Gifts', subcategory: 'Custom Hampers', rating: 4.8 },
  { id: 'gift-7', name: 'Mini Gift Set', price: 999, originalPrice: 1399, image: '/gift-1.jpg', category: 'Return Gifts', subcategory: 'Party Favors', rating: 4.7, isNew: true },
  { id: 'gift-8', name: 'Luxury Gift Collection', price: 5999, originalPrice: 7999, image: '/gift-2.jpg', category: 'Return Gifts', subcategory: 'Gift Sets', rating: 5.0 },
]

export const categories = [
  { slug: 'bath-linen', name: 'Bath Linen', subcategories: ['Bath Towels', 'Hoodie Towels', 'Bath Robes', 'Towel Sets'] },
  { slug: 'bedding', name: 'Bedding', subcategories: ['Quilts', 'Dohars', 'Bedding Sets'] },
  { slug: 'bags', name: 'Bags', subcategories: ['Backpacks', 'Mini Totes', 'Duffel Bags', 'Sling Bags'] },
  { slug: 'kids-accessories', name: 'Kids Accessories', subcategories: ['Aprons', 'Baby Nest', 'Play Mats', 'Diaper Mats'] },
  { slug: 'moms-corner', name: "Mom's Corner", subcategories: ['Jhola Bags', 'Tote Bags', 'Face Towels', 'Multi Purpose Bags'] },
  { slug: 'return-gifts', name: 'Return Gifts', subcategories: ['Gift Sets', 'Custom Hampers', 'Party Favors'] },
]

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id)
}

export const getProductsByCategory = (category: string) => {

  if (category === 'all') {
    return allProducts
  }

  return allProducts.filter((product) => {

    const formattedCategory = product.category
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/'/g, '')

    return formattedCategory === category
  })
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return allProducts.filter(p => p.subcategory === subcategory)
}
