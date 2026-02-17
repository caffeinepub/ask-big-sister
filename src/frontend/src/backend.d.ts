import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Time = bigint;
export type QuestionId = bigint;
export interface Answer {
    text: string;
    author: UserId;
    timestamp: Time;
}
export interface Question {
    id: QuestionId;
    text: string;
    isAnonymous: boolean;
    answer?: Answer;
    author?: UserId;
    timestamp: Time;
    isAnswered: boolean;
}
export interface UserProfile {
    displayName: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    answerQuestion(questionId: QuestionId, answerText: string): Promise<Answer>;
    askQuestion(text: string, isAnonymous: boolean): Promise<Question>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteQuestion(questionId: QuestionId): Promise<void>;
    getAllQuestions(): Promise<Array<Question>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGuidanceText(): Promise<string>;
    getQuestion(questionId: QuestionId): Promise<Question | null>;
    getQuestionsByUser(userId: UserId): Promise<Array<Question>>;
    getUnansweredQuestions(): Promise<Array<Question>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    reportContent(questionId: QuestionId, _reason: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
