'use client';

import type React from 'react';
import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, AlertCircle, User } from 'lucide-react';
import { askChatbotAction, type AskChatbotActionState } from '@/app/actions/ask-chatbot';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: React.ReactNode;
  timestamp: Date;
}

const initialActionState: AskChatbotActionState = {
  question: undefined,
  answer: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
    </Button>
  );
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [actionState, formAction] = useActionState(askChatbotAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (actionState?.answer && actionState?.question) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: actionState.question!,
          timestamp: new Date(),
        },
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: actionState.answer!,
          timestamp: new Date(),
        },
      ]);
      setCurrentQuestion(''); // Clear input after successful submission
    } else if (actionState?.error && actionState?.question) {
       setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: actionState.question!,
          timestamp: new Date(),
        },
        {
          id: `bot-error-${Date.now()}`,
          sender: 'bot',
          text: (
            <span className="text-destructive flex items-center gap-2">
              <AlertCircle size={16} /> {actionState.error}
            </span>
          ),
          timestamp: new Date(),
        },
      ]);
    }
  }, [actionState]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleFormSubmit = (formData: FormData) => {
    formAction(formData);
  };
  
  // Add initial welcome message
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setChatHistory([
        {
          id: 'bot-welcome',
          sender: 'bot',
          text: "Hello! I'm the KlasAfrica assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-lg p-4 h-16 w-16 z-50"
          aria-label="Open Chatbot"
        >
          <Bot size={32} className="icon-glow" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="top" 
        align="end" 
        className="w-[90vw] max-w-md h-[70vh] max-h-[600px] p-0 flex flex-col shadow-2xl rounded-lg border-border"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevents focus on first element, allowing manual focus on input
      >
        <Card className="flex flex-col h-full w-full border-0 shadow-none rounded-lg">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot size={24} /> KlasAfrica Assistant
              </CardTitle>
              {/* Optional: Close button if needed, Popover handles outside click */}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-2 max-w-[85%]",
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    )}
                  >
                    <div className={cn(
                        "p-1 rounded-full text-white flex items-center justify-center shrink-0",
                        msg.sender === 'user' ? 'bg-primary' : 'bg-foreground/70'
                    )}>
                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm shadow-md',
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-card border border-border text-card-foreground rounded-bl-none'
                      )}
                    >
                      {msg.text}
                      <div className={cn(
                        "text-xs mt-1 opacity-70",
                         msg.sender === 'user' ? 'text-right' : 'text-left'
                        )}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <Separator />
          <CardFooter className="p-3 border-t border-border">
            <form
              ref={formRef}
              action={handleFormSubmit}
              className="flex w-full items-center space-x-2"
            >
              <Label htmlFor="chatbot-question" className="sr-only">
                Ask a question
              </Label>
              <Input
                id="chatbot-question"
                name="question"
                type="text"
                placeholder="Type your question..."
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                className="flex-1 h-10"
                autoComplete="off"
                required
              />
              <SubmitButton />
            </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default Chatbot;
