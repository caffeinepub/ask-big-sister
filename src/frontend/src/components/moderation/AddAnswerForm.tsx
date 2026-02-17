import { useState } from 'react';
import { useAnswerQuestion } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send, Heart } from 'lucide-react';

interface AddAnswerFormProps {
  questionId: string;
}

export default function AddAnswerForm({ questionId }: AddAnswerFormProps) {
  const [answerText, setAnswerText] = useState('');
  const answerQuestion = useAnswerQuestion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answerText.trim().length < 20) {
      alert('Please provide a more detailed answer (at least 20 characters).');
      return;
    }

    try {
      await answerQuestion.mutateAsync({
        questionId,
        answerText: answerText.trim(),
      });
      
      setAnswerText('');
    } catch (error: any) {
      alert(error.message || 'Failed to submit answer. Please try again.');
    }
  };

  const charCount = answerText.length;

  return (
    <Card className="border-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Provide a Compassionate Response
        </CardTitle>
        <CardDescription>
          As a Big Sister moderator, your words matter. Take time to provide thoughtful, empathetic guidance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 text-sm text-foreground/80">
            <strong className="text-foreground">Remember:</strong> Be kind, non-judgmental, and supportive. Share wisdom, not directives. Acknowledge feelings and offer perspective.
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Your Response</Label>
            <Textarea
              id="answer"
              placeholder="Share your compassionate guidance here..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              rows={8}
              className="resize-none"
              required
            />
            <div className="text-sm text-muted-foreground">
              {charCount < 20 ? `${20 - charCount} more characters needed` : `${charCount} characters`}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={charCount < 20 || answerQuestion.isPending}
          >
            {answerQuestion.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Response
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

