import { useGetQuestion, useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, ArrowLeft, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import AddAnswerForm from '../components/moderation/AddAnswerForm';

interface QuestionDetailPageProps {
  questionId: string;
}

export default function QuestionDetailPage({ questionId }: QuestionDetailPageProps) {
  const { data: question, isLoading } = useGetQuestion(questionId);
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin = false } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground mt-4">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Question not found.</p>
            <a href="#home" className="text-primary hover:underline">
              Return to Home
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Questions
        </a>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {question.isAnswered ? (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Answered
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Answer
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl leading-relaxed">
                  {question.text}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {question.isAnonymous ? 'Anonymous' : 'Community member'}
                </span>
              </div>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(Number(question.timestamp) / 1000000), { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Answer Section */}
        {question.answer ? (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Big Sister's Response
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {question.answer.text}
              </p>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Answered {formatDistanceToNow(new Date(Number(question.answer.timestamp) / 1000000), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {isAdmin ? (
              <AddAnswerForm questionId={questionId} />
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    This question is waiting for a response from our Big Sister moderators.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

