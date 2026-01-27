import { Category } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/shop?category=${category.name}`}
      className="group relative flex aspect-4/3 w-full overflow-hidden rounded-xl bg-muted"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-white/80 text-sm font-medium opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          Shop Now
        </p>
      </div>
    </Link>
  );
}
