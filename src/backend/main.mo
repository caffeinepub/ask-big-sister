import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  public type QuestionId = Nat;
  public type UserId = Principal;

  public type Question = {
    id : QuestionId;
    author : ?UserId;
    text : Text;
    timestamp : Time.Time;
    isAnswered : Bool;
    isAnonymous : Bool;
    answer : ?Answer;
  };

  public type Answer = {
    text : Text;
    author : UserId;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    displayName : Text;
  };

  module Question {
    public func compare(q1 : Question, q2 : Question) : Order.Order {
      Nat.compare(q1.id, q2.id);
    };
  };

  let questions = Map.empty<QuestionId, Question>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextQuestionId = 0;
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Question management
  public shared ({ caller }) func askQuestion(text : Text, isAnonymous : Bool) : async Question {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can ask questions");
    };

    if (text.size() < 10) {
      Runtime.trap("Question is too short - please provide more details or context");
    };

    if (text.size() > 500) {
      Runtime.trap("Question is too long - please keep it under 500 characters");
    };

    let question : Question = {
      id = nextQuestionId;
      author = if (isAnonymous) { null } else { ?caller };
      text;
      timestamp = Time.now();
      isAnswered = false;
      isAnonymous;
      answer = null;
    };

    questions.add(nextQuestionId, question);
    nextQuestionId += 1;
    question;
  };

  public shared ({ caller }) func answerQuestion(questionId : QuestionId, answerText : Text) : async Answer {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can answer questions");
    };

    if (answerText.size() < 20) {
      Runtime.trap("Please provide a thoughtful answer with more detail");
    };

    switch (questions.get(questionId)) {
      case (?question) {
        if (question.isAnswered) {
          Runtime.trap("Question has already been answered");
        };

        let answer : Answer = {
          text = answerText;
          author = caller;
          timestamp = Time.now();
        };

        let updatedQuestion = {
          question with
          isAnswered = true;
          answer = ?answer;
        };

        questions.add(questionId, updatedQuestion);
        answer;
      };
      case (null) {
        Runtime.trap("Question not found");
      };
    };
  };

  public query ({ caller }) func getQuestion(questionId : QuestionId) : async ?Question {
    // Public read access - anyone can view questions
    questions.get(questionId);
  };

  public query ({ caller }) func getAllQuestions() : async [Question] {
    // Public read access - anyone can view all questions
    questions.values().sort().toArray();
  };

  public query ({ caller }) func getUnansweredQuestions() : async [Question] {
    // Admin-only: part of the answering workflow for Big Sister moderators
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view unanswered questions");
    };

    let unanswered = questions.values().filter(
      func(q : Question) : Bool { not q.isAnswered }
    );
    unanswered.sort().toArray();
  };

  public query ({ caller }) func getQuestionsByUser(userId : UserId) : async [Question] {
    // Privacy protection: users can only see their own questions, admins can see any
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own questions");
    };

    let userQuestions = questions.values().filter(
      func(q : Question) : Bool {
        switch (q.author) {
          case (?author) { author == userId };
          case (null) { false };
        }
      }
    );
    userQuestions.sort().toArray();
  };

  public shared ({ caller }) func deleteQuestion(questionId : QuestionId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete questions");
    };

    switch (questions.get(questionId)) {
      case (?_question) {
        questions.remove(questionId);
      };
      case (null) {
        Runtime.trap("Question not found");
      };
    };
  };

  public query ({ caller }) func getGuidanceText() : async Text {
    // Public access - guidance text for all users
    "This is a safe space to ask questions. Be respectful, and remember: there are no 'dumb' questions!";
  };

  public shared ({ caller }) func reportContent(questionId : QuestionId, _reason : Text) : async () {
    // Require user authentication to report content
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can report content");
    };

    switch (questions.get(questionId)) {
      case (?_question) {
        (); // content review logic to be added later
      };
      case (null) {
        Runtime.trap("Question not found");
      };
    };
  };
};
