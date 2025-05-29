"use client";

import type React from 'react';
import { useEffect, useActionState } from 'react'; // Changed useFormState to useActionState and import from 'react'
import { useFormStatus } from 'react-dom'; // useFormStatus is still from react-dom
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Loader2 } from 'lucide-react'; // Removed CheckCircle, AlertTriangle as they are not used directly
import { useToast } from '@/hooks/use-toast';
import { subscribeEmailAction, type SubscribeActionState } from '@/app/actions/subscribe';

const initialState: SubscribeActionState = {
  message: '',
  isSuccess: false,
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
      Subscribe
    </Button>
  );
}

const EmailSubscriptionSection = () => {
  const [state, formAction] = useActionState(subscribeEmailAction, initialState); // Changed useFormState to useActionState
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: "Subscribed!",
          description: state.message,
          variant: "default",
        });
         // Optionally clear the form or redirect. For now, message is enough.
      } else if (state.errors?.email) {
         toast({
          title: "Subscription Failed",
          description: state.errors.email[0],
          variant: "destructive",
        });
      } else {
         toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="subscribe" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="mx-auto h-12 w-12 text-primary mb-4 icon-glow" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Early Access & Updates
          </h2>
          <p className="text-muted-foreground mb-8">
            Be the first to know when KlasAfrica launches. Join our waitlist for exclusive updates and early bird offers.
          </p>
          <form action={formAction} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full">
                <Label htmlFor="email-subscribe" className="sr-only">Email address</Label>
                <Input
                  type="email"
                  id="email-subscribe"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="h-12 text-lg"
                  aria-describedby="email-error"
                />
                {state?.errors?.email && (
                   <p id="email-error" className="text-sm text-destructive mt-1 text-left">{state.errors.email[0]}</p>
                )}
              </div>
              <SubmitButton />
            </div>
            {/* General success/error message display (alternative to toast for persistent messages) */}
            {/* {state.message && !state.errors?.email && (
              <p className={`mt-2 text-sm ${state.isSuccess ? 'text-green-500' : 'text-destructive'}`}>
                {state.message}
              </p>
            )} */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscriptionSection;
