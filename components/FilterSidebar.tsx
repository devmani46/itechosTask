"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  initialFilters?: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

export default function FilterSidebar({
  categories,
  brands,
  priceRange,
  initialFilters,
  onApplyFilters,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialFilters?.brands || []
  );
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || priceRange
  );

  const [expanded, setExpanded] = useState({
    category: true,
    brand: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setCurrentPriceRange(priceRange);
    onApplyFilters({
      categories: [],
      brands: [],
      priceRange: priceRange,
    });
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: currentPriceRange,
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          Filters
        </h3>
        <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-primary hover:text-primary/80 font-semibold px-2 h-auto text-xs uppercase"
        >
            Reset All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Section */}
        <div className="border-b pb-4 last:border-0">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <span className="font-semibold flex items-center gap-2 text-sm uppercase text-gray-800">
               <span className="text-lg">Category</span>
            </span>
            {expanded.category ? (
              <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            )}
          </button>
          
          {expanded.category && (
            <div className="space-y-3 pl-1 animate-in slide-in-from-top-2 duration-200">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-3">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="text-sm text-gray-600 font-medium leading-none cursor-pointer hover:text-primary transition-colors"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand Section */}
        <div className="border-b pb-4 last:border-0">
          <button
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <span className="font-semibold flex items-center gap-2 text-sm uppercase text-gray-800">
               <span className="text-lg">Brand</span>
            </span>
             {expanded.brand ? (
              <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            )}
          </button>
          
          {expanded.brand && (
            <div className="space-y-3 pl-1 animate-in slide-in-from-top-2 duration-200">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm text-gray-600 font-medium leading-none cursor-pointer hover:text-primary transition-colors"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div className="border-b pb-4 last:border-0">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <span className="font-semibold flex items-center gap-2 text-sm uppercase text-gray-800">
               <span className="text-lg">Price Range</span>
            </span>
             {expanded.price ? (
              <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            )}
          </button>
          
          {expanded.price && (
            <div className="space-y-6 px-1 pt-2 animate-in slide-in-from-top-2 duration-200">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                value={[currentPriceRange[0], currentPriceRange[1]]}
                max={priceRange[1]}
                min={priceRange[0]}
                step={100}
                onValueChange={(value) => setCurrentPriceRange([value[0], value[1]])}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>Rs {currentPriceRange[0].toLocaleString()}</span>
                <span>Rs {currentPriceRange[1].toLocaleString()}+</span>
              </div>
            </div>
          )}
        </div>

         {/* Storage Section (Placeholder) */}
         <div className="border-b pb-4 last:border-0">
          <button
            disabled
            className="flex items-center justify-between w-full mb-4 opacity-50 cursor-not-allowed"
          >
            <span className="font-semibold flex items-center gap-2 text-sm uppercase text-gray-800">
               <span className="text-lg">Storage</span>
            </span>
             <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>

      </div>

      <div className="mt-8">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
      </div>
    </div>
  );
}

