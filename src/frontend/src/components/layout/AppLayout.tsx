import { Heart } from 'lucide-react';
import NavBar from './NavBar';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

interface AppLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
}

export default function AppLayout({ children, currentRoute }: AppLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'ask-big-sister');
  
  const { play, pause, setVolume, isPlaying, volume, error } = useBackgroundMusic();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar 
        currentRoute={currentRoute}
        musicControls={{
          isPlaying,
          volume,
          error,
          onPlayPause: handlePlayPause,
          onVolumeChange: setVolume,
        }}
      />
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Ask Big Sister. A safe space for questions.</p>
            <p className="flex items-center gap-1.5">
              Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
