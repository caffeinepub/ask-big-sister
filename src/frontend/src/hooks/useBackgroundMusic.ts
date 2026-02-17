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

export function useBackgroundMusic(): BackgroundMusicControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<BackgroundMusicState>(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        return {
          isPlaying: false, // Never autoplay
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
      const audio = new Audio('/assets/audio/soothing-background.mp3');
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

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        volume: state.volume,
      })
    );
  }, [state.volume]);

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
