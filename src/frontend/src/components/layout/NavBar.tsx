import { MessageCircle, Home, Info } from 'lucide-react';
import LoginButton from '../auth/LoginButton';

interface NavBarProps {
  currentRoute: string;
}

export default function NavBar({ currentRoute }: NavBarProps) {
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

          <div className="flex items-center gap-4">
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

