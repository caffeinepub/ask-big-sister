import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Heart, Shield, MessageCircle } from 'lucide-react';

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <img 
            src="/assets/generated/ask-big-sister-logo.dim_512x512.png" 
            alt="Ask Big Sister" 
            className="h-24 w-24 mx-auto rounded-2xl shadow-warm"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Ask Big Sister
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            A safe, supportive space to ask those hard-to-ask questions and receive compassionate guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 py-8">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Empathetic</h3>
            <p className="text-sm text-muted-foreground">
              Get caring, big-sister style advice
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Private</h3>
            <p className="text-sm text-muted-foreground">
              Option to post anonymously
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Supportive</h3>
            <p className="text-sm text-muted-foreground">
              No judgment, just understanding
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={loginStatus === 'logging-in'}
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            {loginStatus === 'logging-in' ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Get Started'
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Secure login powered by Internet Identity
          </p>
        </div>
      </div>
    </div>
  );
}

