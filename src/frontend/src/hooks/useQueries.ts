import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Question, UserProfile, Answer } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllQuestions() {
  const { actor, isFetching } = useActor();

  return useQuery<Question[]>({
    queryKey: ['questions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQuestion(questionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Question | null>({
    queryKey: ['question', questionId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getQuestion(BigInt(questionId));
    },
    enabled: !!actor && !isFetching && !!questionId,
  });
}

export function useAskQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text, isAnonymous }: { text: string; isAnonymous: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.askQuestion(text, isAnonymous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useGetGuidanceText() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['guidanceText'],
    queryFn: async () => {
      if (!actor) return "This is a safe space to ask questions. Be respectful, and remember: there are no 'dumb' questions!";
      return actor.getGuidanceText();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) return { user: null };
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAnswerQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, answerText }: { questionId: string; answerText: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.answerQuestion(BigInt(questionId), answerText);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['question', variables.questionId] });
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useGetUserProfile(userId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      if (!actor) return null;
      const principal = { toText: () => userId } as any;
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

