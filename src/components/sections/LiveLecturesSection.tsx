"use client";

import type React from 'react';
import { useState, useEffect, useActionState } from 'react'; // Changed useFormState to useActionState and import from 'react'
import { useFormStatus } from 'react-dom'; // useFormStatus is still from react-dom
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { translateTextAction, type TranslateActionState } from '@/app/actions/translate';
import { AlertCircle, Loader2, Languages } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const africanLanguages = [
  { value: 'sw', label: 'Swahili' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'zu', label: 'Zulu' },
  { value: 'ha', label: 'Hausa' },
  { value: 'ig', label: 'Igbo' },
  { value: 'am', label: 'Amharic' },
  { value: 'om', label: 'Oromo' },
];

const initialState: TranslateActionState = {
  translatedText: '',
  error: undefined,
  input: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
      Translate Text
    </Button>
  );
}

const LiveLecturesSection = () => {
  const [state, formAction] = useActionState(translateTextAction, initialState); // Changed useFormState to useActionState
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English'); // Default source
  const [targetLanguage, setTargetLanguage] = useState(africanLanguages[0].value);

  useEffect(() => {
    if (state?.input?.text) {
      setInputText(state.input.text);
    }
    if (state?.input?.sourceLanguage) {
      setSourceLanguage(state.input.sourceLanguage);
    }
    if (state?.input?.targetLanguage) {
      setTargetLanguage(state.input.targetLanguage);
    }
  }, [state?.input]);


  return (
    <section id="live-lectures" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Experience <span className="text-primary">Live AI Translation</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Try our real-time translation tool. Enter text, select languages, and see the magic happen. This demonstrates our core AI capability for lectures.
        </p>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle>Real-time Text Translator</CardTitle>
            <CardDescription>Powered by KlasAfrica AI</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="text-to-translate">Text to Translate</Label>
                <Textarea
                  id="text-to-translate"
                  name="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter English text here..."
                  rows={5}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="source-language">Source Language</Label>
                  <Select name="sourceLanguage" value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger id="source-language" className="mt-1">
                      <SelectValue placeholder="Select source language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      {/* Add other source languages if needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target-language">Target Language (African)</Label>
                  <Select name="targetLanguage" value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger id="target-language" className="mt-1">
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent>
                      {africanLanguages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <SubmitButton />

              {state?.error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              {state?.translatedText && !state.error && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Label htmlFor="translated-text" className="text-lg font-semibold">Translated Text:</Label>
                  <Textarea
                    id="translated-text"
                    value={state.translatedText}
                    readOnly
                    rows={5}
                    className="mt-2 bg-muted/50 cursor-default"
                  />
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LiveLecturesSection;
