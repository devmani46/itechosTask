"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      // Capitalize and format the path segment
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        
        return (
          <div key={crumb.href} className="flex items-center">
            {index === 0 ? (
              <Link 
                href={crumb.href}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <span>{crumb.label}</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                {isLast ? (
                  <span className="font-medium text-gray-900">{crumb.label}</span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
