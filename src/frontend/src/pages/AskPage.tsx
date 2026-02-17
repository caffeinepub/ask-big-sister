import { useState } from 'react';
import { useAskQuestion, useGetGuidanceText } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Send } from 'lucide-react';

export default function AskPage() {
  const [questionText, setQuestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const askQuestion = useAskQuestion();
  const { data: guidanceText } = useGetGuidanceText();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim().length < 10) {
      alert('Please provide more details in your question (at least 10 characters).');
      return;
    }

    try {
      const newQuestion = await askQuestion.mutateAsync({
        text: questionText.trim(),
        isAnonymous,
      });
      
      // Navigate to the new question
      window.location.hash = `question/${newQuestion.id.toString()}`;
      
      // Reset form
      setQuestionText('');
      setIsAnonymous(false);
    } catch (error: any) {
      alert(error.message || 'Failed to submit question. Please try again.');
    }
  };

  const charCount = questionText.length;
  const isValid = charCount >= 10 && charCount <= 500;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Ask a Question</h1>
          <p className="text-lg text-muted-foreground">
            Share what's on your mind. We're here to listen and support you.
          </p>
        </div>

        {/* Guidance */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {guidanceText || "This is a safe space to ask questions. Be respectful, and remember: there are no 'dumb' questions!"}
            </p>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="flex gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">Please note:</strong> This platform provides peer support and is not a substitute for professional help. If you're experiencing a crisis, please contact emergency services or a professional helpline immediately.
          </div>
        </div>

        {/* Question Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Question</CardTitle>
            <CardDescription>
              Be as detailed as you'd like. The more context you provide, the better we can help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question">Question Details</Label>
                <Textarea
                  id="question"
                  placeholder="What would you like to ask? Share your thoughts, concerns, or questions here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={8}
                  className="resize-none"
                  required
                />
                <div className="flex justify-between text-sm">
                  <span className={`${charCount < 10 ? 'text-destructive' : charCount > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {charCount < 10 ? `${10 - charCount} more characters needed` : `${charCount}/500 characters`}
                  </span>
                  {charCount > 500 && (
                    <span className="text-destructive">Too long! Please shorten your question.</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous" className="text-base font-medium">
                    Post Anonymously
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your identity won't be shown to other users
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isValid || askQuestion.isPending}
              >
                {askQuestion.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Question
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

