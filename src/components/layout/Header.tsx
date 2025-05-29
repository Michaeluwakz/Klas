import type React from 'react';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-4 px-4 md:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav className="flex items-center space-x-4">
          {/* Placeholder for future navigation items */}
          {/* <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link> */}
          <Button asChild variant="outline">
            <Link href="#subscribe">Get Early Access</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
