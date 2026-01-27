"use client"
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { categories } from "@/data/categories"
import { 
  Laptop, 
  Smartphone, 
  Gamepad, 
  Headphones, 
  Watch, 
  Cable, 
  Keyboard, 
  Mouse, 
  Mic, 
  Apple 
} from "lucide-react"

export function FeaturedCategories() {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const displayedCategories = isExpanded ? categories : categories.slice(0, 6)

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "laptops": return <Laptop className="h-8 w-8 text-blue-600" />
      case "smartphones": return <Smartphone className="h-8 w-8 text-blue-600" />
      case "gaming": return <Gamepad className="h-8 w-8 text-blue-600" />
      case "audio": return <Headphones className="h-8 w-8 text-blue-600" />
      case "wearables": return <Watch className="h-8 w-8 text-blue-600" />
      case "accessories": return <Cable className="h-8 w-8 text-blue-600" />
      case "iphones": return <Smartphone className="h-8 w-8 text-blue-600" />
      case "macbooks": return <Laptop className="h-8 w-8 text-blue-600" />
      case "keyboards": return <Keyboard className="h-8 w-8 text-blue-600" />
      case "mouse": return <Mouse className="h-8 w-8 text-blue-600" />
      case "airpods": return <Headphones className="h-8 w-8 text-blue-600" />
      case "headsets": return <Mic className="h-8 w-8 text-blue-600" />
      default: return <Apple className="h-8 w-8 text-blue-600" />
    }
  }

  return (
    <section className="container px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Categories</h2>
        <button 
          onClick={toggleExpand}
          className="text-sm font-medium hover:underline text-blue-600 flex items-center gap-1 cursor-pointer"
        >
          {isExpanded ? "View Less" : "View All"} 
          <span className="text-lg leading-none mb-0.5">›</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {displayedCategories.map((category) => (
          <Link 
            key={category.id} 
            href={`/shop?category=${category.name}`}
            className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-blue-100 transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              {getIcon(category.name)}
            </div>
            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
