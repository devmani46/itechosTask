"use client"
import * as React from "react"
import { ProductImage } from "@/components/ui/product-image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { products } from "@/data/products"
import { Star, ArrowRight } from "lucide-react"

export function TrendingProducts() {
  const trendingProducts = products.slice(5, 13).map((product) => {
     const discount = product.offerPrice 
        ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
        : 0;
     
      return {
          ...product,
          discount
      }
  })

  return (
    <section className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Products</h2>
            <p className="text-muted-foreground mt-1">Popular items this week in Kathmandu</p>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
         <div className="absolute -top-16 right-0 flex gap-2">
            <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 h-10 w-10 rounded-full" />
            <CarouselNext className="static translate-y-0 translate-x-0 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 h-10 w-10 rounded-full" />
         </div>
        
        <CarouselContent className="-ml-4z">
          {trendingProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 lg:basis-1/4">
              <div className="p-1 h-full">
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden bg-white">
                  <CardContent className="p-4 flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-3xl mb-1 overflow-hidden group">
                        <ProductImage
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105 pb-4"
                            fallbackText={product.name}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.label && (
                                <Badge className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 text-xs font-bold uppercase border-0">
                                    {product.label}
                                </Badge>
                            )}
                            {product.discount > 0 && (
                                <Badge className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 text-xs font-bold uppercase border-0">
                                    -{product.discount}% OFF
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col gap-2 grow">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {product.brand}
                        </span>
                        
                        <Link href={`/shop/${product.id}`} className="hover:text-blue-600 transition-colors">
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-1" title={product.name}>
                                {product.name}
                            </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-current" : "text-gray-200 fill-gray-200"}`} 
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-400">({product.ratingCount})</span>
                        </div>

                        {/* Price */}
                        <div className="mt-auto pt-2 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-blue-600">
                                NPR {product.offerPrice ? product.offerPrice.toLocaleString() : product.price.toLocaleString()}
                            </span>
                            {product.offerPrice && (
                                <span className="text-sm text-gray-400 line-through decoration-gray-400/50">
                                    NPR {product.price.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="flex justify-end mt-8">
           <Link href="/shop" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View all Products <ArrowRight className="h-4 w-4" />
          </Link>
      </div>
    </section>
  )
}
