import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Layers } from 'lucide-react';

export default function PreFooter() {
  return (
    <div className="bg-background py-16 border-t">
      <div className="container px-4 md:px-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* <Layers className="h-6 w-6 text-blue-600 fill-blue-600" /> */}
              <span className="text-xl font-bold">iTechos Nepal</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The leading destination for authentic gadgets and electronics in Nepal. Quality products, competitive prices.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Facebook className="h-5 w-5 text-foreground/80" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Instagram className="h-5 w-5 text-foreground/80" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Twitter className="h-5 w-5 text-foreground/80" />
              </Link>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Laptops & PC</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Smartphones</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Audio & Headphones</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Gaming Accessories</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Wearable Tech</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Shipping Information</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                <span>New Baneshwor, Kathmandu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                <span>+977 980-0000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                <span>info@itechosnepal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 shrink-0" />
                <span>Sun-Fri: 10AM - 7PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
