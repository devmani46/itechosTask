"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, User, Search, Menu, Layers } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigation
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-30">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                {/* <Layers className="h-6 w-6 text-blue-600 fill-blue-600" /> */}
                <span>iTechos Nepal</span>
              </Link>
              <Link href="/Laptops" className="text-muted-foreground hover:text-foreground">
                Laptops
              </Link>
              <Link href="/iPhones" className="text-muted-foreground hover:text-foreground">
                iPhones
              </Link>
              <Link href="/Gaming" className="text-muted-foreground hover:text-foreground">
                Gaming
              </Link>
              <Link href="/Support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-4 md:mr-0">
          {/* <Layers className="h-8 w-8 text-blue-500 fill-blue-500 transform rotate-180" /> */}
          <span className="text-xl font-bold tracking-tight hidden sm:inline-block">iTechosNepal</span>
        </Link>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search for laptops, iPhones, accessories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-input rounded-lg"
          />
        </form>

        {/* Desktop Nav & Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
           {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium mr-4">
            <Link href="/Laptops" className="text-muted-foreground hover:text-foreground transition-colors">
              Laptops
            </Link>
            <Link href="/iPhones" className="text-muted-foreground hover:text-foreground transition-colors">
              iPhones
            </Link>
            <Link href="/Gaming" className="text-muted-foreground hover:text-foreground transition-colors">
              Gaming
            </Link>
             <Link href="/Support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Wishlist">
             <Heart className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Account">
             <User className="h-5 w-5" />
          </Button>
          
          <Button size="icon" className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl relative h-10 w-10 shrink-0" aria-label="Cart">
             <ShoppingBag className="h-5 w-5" />
             <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-bold border-2 border-background">
               2
             </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
