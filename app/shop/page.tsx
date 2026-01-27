"use client";

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function ShopPage() {
  // categories and brands
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), []);
  
  // Calculate price range
  const minPrice = useMemo(() => Math.min(...products.map(p => p.price)), []);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), []);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleApplyFilters = (filters: {
    categories: string[];
    brands: string[];
    priceRange: [number, number];
  }) => {
    const newFilteredProducts = products.filter((product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return categoryMatch && brandMatch && priceMatch;
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); 
    setIsFilterOpen(false);
  };

  return (
    <div className="container px-4 py-8 md:px-30 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smartphones & Gadgets</h1>
          <p className="text-muted-foreground mt-2">
            Discover {filteredProducts.length} premium products matching your lifestyle.
          </p>
        </div>
        <div className="lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="py-6">
                <FilterSidebar 
                   categories={categories}
                   brands={brands}
                   priceRange={[minPrice, maxPrice]}
                   onApplyFilters={handleApplyFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 flex-none">
          <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
            <FilterSidebar 
               categories={categories}
               brands={brands}
               priceRange={[minPrice, maxPrice]}
               onApplyFilters={handleApplyFilters}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => setFilteredProducts(products)}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
