"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { products } from "@/data/products"
import { ArrowRight } from "lucide-react"

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const carouselProducts = products.slice(0, 5).map((product, index) => ({
    ...product,
    // label is now in product data
    buttonText: index % 2 === 0 ? "Shop Now" : "Learn More"
  }))

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="-ml-4">
            {carouselProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-[85%] md:basis-[75%] lg:basis-[70%]">
                <div className="h-full">
                  <Card className="relative overflow-hidden border-0 shadow-lg rounded-3xl h-[400px] md:h-[500px] group">
                    <div className="absolute inset-0">
                         <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                         />
                         <div className="absolute inset-0 bg-black/60 md:bg-black/40 bg-linear-to-r from-black/80 to-transparent" />
                    </div>
                    
                    <CardContent className="relative h-full flex flex-col justify-start pt-24 md:pt-12 px-8 md:px-16 max-w-2xl">
                         <div className="space-y-4">
                            {product.label && (
                                <span className="text-blue-400 font-bold tracking-wider text-xs md:text-sm uppercase block h-6">
                                    {product.label}
                                </span>
                            )}
                            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white tracking-tight line-clamp-2 min-h-[1.2em] md:min-h-[2.4em]">
                                {product.name}
                            </h2>
                             <p className="text-gray-200 text-base md:text-lg line-clamp-2 md:line-clamp-3 max-w-md font-medium min-h-[3em] md:min-h-[4.5em]">
                                {product.description}
                            </p>
                            <div className="pt-4">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold transition-all hover:scale-105" asChild>
                                    <Link href={`/shop/${product.id}`}>
                                    {product.buttonText} {product.buttonText === 'Shop Now' ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
                                    {product.buttonText === 'Learn More' ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm" />
          <CarouselNext className="hidden md:flex -right-4 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm" />
        </Carousel>
      </div>
    </div>
  )
}
