import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import AppLayout from './components/layout/AppLayout';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import HomePage from './pages/HomePage';
import AskPage from './pages/AskPage';
import AboutPage from './pages/AboutPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LoginPage from './pages/LoginPage';
import { useActor } from './hooks/useActor';
import { useEffect, useState } from 'react';

function App() {
  const { identity, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [questionId, setQuestionId] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const [route, id] = hash.split('/');
      setCurrentRoute(route);
      setQuestionId(id || null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show login page if not authenticated
  if (!isAuthenticated || loginStatus === 'logging-in') {
    return <LoginPage />;
  }

  // Show loading while actor or profile is initializing
  if (actorFetching || (profileLoading && !isFetched)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show profile setup dialog if needed
  if (showProfileSetup) {
    return <ProfileSetupDialog />;
  }

  // Render the appropriate page based on route
  const renderPage = () => {
    switch (currentRoute) {
      case 'ask':
        return <AskPage />;
      case 'about':
        return <AboutPage />;
      case 'question':
        return questionId ? <QuestionDetailPage questionId={questionId} /> : <HomePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <AppLayout currentRoute={currentRoute}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;

