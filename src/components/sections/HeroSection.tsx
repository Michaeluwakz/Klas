import type React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Image from 'next/image'; // Image component no longer needed

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-card/30 overflow-hidden">
      {/* The div containing the background Image component has been removed */}
      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-foreground">
            KlasAfrica:
          </span> Learn, Teach, Grow.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Empowering students, educators, and businesses across Africa with AI-driven tools, accessible education, and real-time multilingual support.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#subscribe">Join Waitlist</Link>
          </Button>
        </div>
      </div>
       <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
