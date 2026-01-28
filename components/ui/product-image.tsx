"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
}

export function ProductImage({
  src,
  alt,
  className,
  fallbackText,
  ...props
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 p-4 text-center font-bold uppercase tracking-wider h-full w-full",
          className
        )}
      >
        <span className="text-sm line-clamp-2">
          {fallbackText || alt || "Product Image"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
