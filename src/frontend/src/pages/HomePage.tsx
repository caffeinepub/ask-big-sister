import { useGetAllQuestions, useGetGuidanceText } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function HomePage() {
  const { data: questions = [], isLoading } = useGetAllQuestions();
  const { data: guidanceText } = useGetGuidanceText();

  // Sort questions by timestamp (newest first)
  const sortedQuestions = [...questions].sort((a, b) => 
    Number(b.timestamp - a.timestamp)
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground mt-4">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-12 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Welcome to Ask Big Sister
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {guidanceText || "This is a safe space to ask questions. Be respectful, and remember: there are no 'dumb' questions!"}
            </p>
            <div className="pt-4">
              <a
                href="#ask"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Ask a Question
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/assets/generated/ask-big-sister-hero.dim_1600x900.png"
              alt="Supportive conversation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="mb-8 p-6 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong className="text-foreground">Important:</strong> Ask Big Sister provides peer support and guidance, but is not a substitute for professional medical, legal, or mental health advice. If you're in crisis, please contact a professional helpline or emergency services.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Questions</h2>
          <Badge variant="secondary" className="text-sm">
            {questions.length} {questions.length === 1 ? 'question' : 'questions'}
          </Badge>
        </div>

        {sortedQuestions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No questions yet. Be the first to ask!</p>
              <a
                href="#ask"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Ask a Question
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sortedQuestions.map((question) => (
              <a
                key={question.id.toString()}
                href={`#question/${question.id.toString()}`}
                className="block group"
              >
                <Card className="transition-all hover:shadow-warm hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {question.text.length > 100 
                          ? question.text.substring(0, 100) + '...' 
                          : question.text}
                      </CardTitle>
                      {question.isAnswered ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Answered
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {question.isAnonymous ? 'Anonymous' : 'Community member'}
                      </span>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(Number(question.timestamp) / 1000000), { addSuffix: true })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

