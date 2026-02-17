import { useEffect, useRef, useState } from 'react';

interface BackgroundMusicState {
  isPlaying: boolean;
  volume: number;
  error: string | null;
}

interface BackgroundMusicControls {
  play: () => Promise<void>;
  pause: () => void;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  volume: number;
  error: string | null;
}

const STORAGE_KEY = 'ask-big-sister-music-prefs';

interface StoredPreferences {
  volume: number;
  shouldPlay?: boolean;
}

export function useBackgroundMusic(): BackgroundMusicControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayAttemptedRef = useRef(false);
  
  const [state, setState] = useState<BackgroundMusicState>(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const prefs: StoredPreferences = JSON.parse(stored);
        // Backward compatible: if only volume exists, default shouldPlay to true
        const shouldPlay = prefs.shouldPlay !== undefined ? prefs.shouldPlay : true;
        return {
          isPlaying: false, // Will attempt autoplay in effect
          volume: prefs.volume ?? 0.5,
          error: null,
        };
      } catch {
        return { isPlaying: false, volume: 0.5, error: null };
      }
    }
    return { isPlaying: false, volume: 0.5, error: null };
  });

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/assets/audio/soft-flute-background.mp3');
      audio.loop = true;
      audio.volume = state.volume;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Attempt autoplay on mount
  useEffect(() => {
    if (autoplayAttemptedRef.current || !audioRef.current) return;
    
    autoplayAttemptedRef.current = true;
    
    // Check stored preference
    const stored = localStorage.getItem(STORAGE_KEY);
    let shouldAttemptAutoplay = true;
    
    if (stored) {
      try {
        const prefs: StoredPreferences = JSON.parse(stored);
        // If shouldPlay is explicitly false, don't autoplay
        if (prefs.shouldPlay === false) {
          shouldAttemptAutoplay = false;
        }
      } catch {
        // If parsing fails, attempt autoplay
      }
    }
    
    if (shouldAttemptAutoplay) {
      audioRef.current.play()
        .then(() => {
          setState((prev) => ({ ...prev, isPlaying: true, error: null }));
        })
        .catch((error: any) => {
          console.error('Autoplay blocked:', error);
          setState((prev) => ({
            ...prev,
            isPlaying: false,
            error: 'Playback was blocked by your browser. Please press Play.',
          }));
        });
    }
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Persist preferences (volume and play state)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let currentPrefs: StoredPreferences = { volume: state.volume };
    
    if (stored) {
      try {
        currentPrefs = JSON.parse(stored);
      } catch {
        // Use default
      }
    }
    
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        volume: state.volume,
        shouldPlay: state.isPlaying,
      })
    );
  }, [state.volume, state.isPlaying]);

  const play = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setState((prev) => ({ ...prev, isPlaying: true, error: null }));
    } catch (error: any) {
      console.error('Playback error:', error);
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        error: 'Playback was blocked by your browser. Please press Play.',
      }));
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setState((prev) => ({ ...prev, isPlaying: false, error: null }));
  };

  const setVolume = (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState((prev) => ({ ...prev, volume: clampedVolume }));
  };

  return {
    play,
    pause,
    setVolume,
    isPlaying: state.isPlaying,
    volume: state.volume,
    error: state.error,
  };
}
