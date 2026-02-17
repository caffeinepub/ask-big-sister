import { MessageCircle, Home, Info, Music, Pause, Play, Volume2 } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface NavBarProps {
  currentRoute: string;
  musicControls?: {
    isPlaying: boolean;
    volume: number;
    error: string | null;
    onPlayPause: () => void;
    onVolumeChange: (volume: number) => void;
  };
}

export default function NavBar({ currentRoute, musicControls }: NavBarProps) {
  const navItems = [
    { route: 'home', label: 'Home', icon: Home },
    { route: 'ask', label: 'Ask a Question', icon: MessageCircle },
    { route: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/assets/generated/ask-big-sister-logo.dim_512x512.png" 
              alt="Ask Big Sister" 
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-xl font-semibold text-foreground">Ask Big Sister</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ route, label, icon: Icon }) => (
              <a
                key={route}
                href={`#${route}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentRoute === route
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {musicControls && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Music controls"
                  >
                    <Music className="w-4 h-4" />
                    {musicControls.isPlaying && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Background Music</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={musicControls.onPlayPause}
                        aria-label={musicControls.isPlaying ? 'Pause music' : 'Play music'}
                        className="h-8 px-3"
                      >
                        {musicControls.isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 mr-1.5" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1.5" />
                            Play
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <label htmlFor="volume-slider" className="flex items-center gap-1.5 text-muted-foreground">
                          <Volume2 className="w-4 h-4" />
                          Volume
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(musicControls.volume * 100)}%
                        </span>
                      </div>
                      <Slider
                        id="volume-slider"
                        value={[musicControls.volume * 100]}
                        onValueChange={(values) => musicControls.onVolumeChange(values[0] / 100)}
                        max={100}
                        step={1}
                        className="w-full"
                        aria-label="Volume control"
                      />
                    </div>

                    {musicControls.error && (
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        {musicControls.error}
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <LoginButton />
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map(({ route, label, icon: Icon }) => (
            <a
              key={route}
              href={`#${route}`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                currentRoute === route
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
