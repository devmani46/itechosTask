import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-3xl flex flex-col h-full bg-white">
      <CardContent className="p-0 relative aspect-square overflow-hidden bg-gray-50">
         <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.label && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm w-fit">
                    {product.label}
                </Badge>
            )}
             {discount > 0 && (
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm w-fit">
                    -{discount}%
                </Badge>
            )}
          </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-3 p-4 grow">
        <div className="w-full space-y-1">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 min-h-2.5rem">
            {product.name}
          </h3>
        </div>

        <div className="flex items-baseline gap-2 mt-auto">
            <span className={`text-lg font-bold ${product.offerPrice ? 'text-blue-600' : 'text-gray-900'}`}>
                Rs {product.offerPrice ? product.offerPrice.toLocaleString() : product.price.toLocaleString()}
            </span>
             {product.offerPrice && (
                <span className="text-xs text-gray-400 line-through">
                    Rs {product.price.toLocaleString()}
                </span>
            )}
        </div>

        <Button className="w-full rounded-xl bg-gray-100 hover:bg-blue-500 text-gray-900 font-bold gap-2 mt-1 h-9 text-sm transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
