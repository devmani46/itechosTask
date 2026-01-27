export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  category: string;
  image: string;
  rating: number;
  ratingCount: number;
  brand: string;
  label?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
