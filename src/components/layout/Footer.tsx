import type React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border bg-card">
      <div className="container mx-auto text-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} KlasAfrica. All rights reserved.</p>
        <p className="text-xs mt-2">Empowering the future of learning across Africa.</p>
      </div>
    </footer>
  );
};

export default Footer;
