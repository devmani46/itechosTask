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
  return (
    <Card className="group overflow-hidden border-none shadow-none hover:shadow-md transition-all duration-300">
      <CardContent className="p-0 relative aspect-square overflow-hidden bg-muted">
         <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge variant="secondary" className="absolute top-2 left-2 bg-background/80 backdrop-blur">
            {product.category}
          </Badge>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex w-full items-start justify-between">
          <div>
            <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">{product.description}</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between mt-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" className="rounded-full h-8 px-4 gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
