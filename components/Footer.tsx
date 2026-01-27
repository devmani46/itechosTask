import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 md:px-30">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2026 iTechos Nepal. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Terms of Services
          </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Cookies Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
