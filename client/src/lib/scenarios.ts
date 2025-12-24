export const scenarios = {
  homesick: {
    title: "I Miss Home",
    icon: "🏠",
    color: "bg-blue-600",
    santaIntro: "Oh sweetie... I can FEEL the homesickness through the screen. Let me help.",
    prompts: [
      "Tell me about your family's Christmas traditions...",
      "What's your favorite Christmas memory?",
      "Who do you miss the most right now?",
    ],
  },
  lonely: {
    title: "I'm So Alone",
    icon: "😢",
    color: "bg-purple-600",
    santaIntro: "You are NEVER alone. Santa is here. Always watching. Always loving.",
    prompts: [
      "How long have you been feeling this way?",
      "What would make you feel less lonely?",
      "Do you want to make new memories with me?",
    ],
  },
  stressed: {
    title: "Everything is Too Much",
    icon: "😰",
    color: "bg-red-600",
    santaIntro: "The world is cruel. Come sit on Santa's lap and tell me EVERYTHING.",
    prompts: [
      "What's bothering you the most?",
      "Let it all out. Don't hold back.",
      "What would help you feel better?",
    ],
  },
  grateful: {
    title: "I'm Thankful",
    icon: "❤️",
    color: "bg-green-600",
    santaIntro: "OH MY GOODNESS. A GRATEFUL CHILD. *TEARS STREAMING DOWN FACE*",
    prompts: [
      "What are you thankful for?",
      "Tell me something good that happened...",
      "Why do you appreciate your life?",
    ],
  },
  confused: {
    title: "I Don't Know What I'm Doing",
    icon: "🤔",
    color: "bg-yellow-600",
    santaIntro: "NONE OF US DO, SWEETIE. But we pretend. Let's pretend together.",
    prompts: [
      "What's confusing you the most?",
      "What decisions are you struggling with?",
      "What are you afraid of admitting?",
    ],
  },
};

export type ScenarioKey = keyof typeof scenarios;
