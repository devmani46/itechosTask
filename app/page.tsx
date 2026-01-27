import Link from 'next/link';
import PreFooter from '@/components/PreFooter';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import {  ArrowRight } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { TrendingProducts } from '@/components/TrendingProducts';
import { Newsletter } from '@/components/Newsletter';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16 md:px-30 bg-gray-50">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Categories Section */}
      <FeaturedCategories />

      {/* Trending Products Section */}
      <TrendingProducts />

      {/* Newsletter Section */}
      <Newsletter />
      
    </div>
    
  );
}
