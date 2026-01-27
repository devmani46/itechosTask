"use client";

import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  className?: string;
}

export default function Pagination({
  count,
  page,
  onChange,
  showFirstButton = false,
  showLastButton = false,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(count, page + 2);

    if (page <= 3) {
      end = Math.min(count, 5);
      start = 1;
    }
    if (page >= count - 2) {
      start = Math.max(1, count - 4);
      end = count;
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {showFirstButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onChange(1)}
          disabled={page === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="icon"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(p === page && "bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(page + 1)}
        disabled={page === count}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {showLastButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onChange(count)}
          disabled={page === count}
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
