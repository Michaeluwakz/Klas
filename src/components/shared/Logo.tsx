import type React from 'react';
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <BookOpenText className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors icon-glow" />
      <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
        Klas<span className="text-primary group-hover:text-foreground transition-colors">Africa</span>
      </span>
    </Link>
  );
};

export default Logo;
