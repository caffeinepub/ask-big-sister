import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, MessageCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <img 
            src="/assets/generated/ask-big-sister-logo.dim_512x512.png" 
            alt="Ask Big Sister" 
            className="h-20 w-20 mx-auto rounded-xl shadow-warm"
          />
          <h1 className="text-4xl font-bold text-foreground">About Ask Big Sister</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A compassionate community where women can ask hard questions and receive supportive, big-sister style guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Empathy & Compassion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every question is met with understanding and care. Our community of "Big Sisters" provides thoughtful, compassionate guidance without judgment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Privacy & Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can choose to post anonymously. Your privacy is important, and we've built this space to be safe and secure for everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Supportive Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We're building a community of support where women can help each other navigate life's challenges, big and small.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>No Question Too Small</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From everyday concerns to life's bigger questions, everything is welcome here. There are no "dumb" questions.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">1. Ask Your Question</h3>
              <p className="text-muted-foreground">
                Share what's on your mind. You can post with your name or anonymously—whatever feels comfortable.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">2. Receive Guidance</h3>
              <p className="text-muted-foreground">
                Our trusted "Big Sister" moderators will provide thoughtful, empathetic responses to help guide you.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">3. Find Support</h3>
              <p className="text-muted-foreground">
                Browse other questions and answers to find support and realize you're not alone in your experiences.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground/80">
            <p>
              <strong>Ask Big Sister is not a substitute for professional help.</strong> While we provide peer support and guidance, we are not licensed professionals.
            </p>
            <p>
              If you are experiencing a mental health crisis, thoughts of self-harm, or any emergency situation, please contact:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Emergency services (911 in the US)</li>
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>Your local emergency services or crisis helpline</li>
            </ul>
            <p>
              For medical, legal, or mental health concerns, please consult with qualified professionals in those fields.
            </p>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <a
            href="#ask"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Ask Your First Question
          </a>
        </div>
      </div>
    </div>
  );
}

