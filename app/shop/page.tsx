"use client";

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 6;

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest' | 'oldest';
type ViewMode = 'grid' | 'list';

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
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Sorting and Pagination Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => Number(b.id) - Number(a.id));
      case 'oldest':
        return sorted.sort((a, b) => Number(a.id) - Number(b.id));
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.rating - a.rating);
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

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
      <Breadcrumb />
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
              {/* Sorting and View Controls */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
                {/* View Toggle Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-9 w-9"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-9 w-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Count */}
                <div className="text-sm text-muted-foreground">
                  Showing{' '}
                  <span className="font-medium text-foreground">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                    {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-foreground">
                    {sortedProducts.length}
                  </span>{' '}
                  products
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  : "flex flex-col gap-4 mb-8"
              }>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    // showFirstButton
                    // showLastButton
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
