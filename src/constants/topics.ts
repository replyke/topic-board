import { Topic } from "../types/topic";

// Sample forum topics data
export const topics: Topic[] = [
  {
    id: "general",
    title: "General",
    description: "Talk about anything and everything",
    category: "general",
    tags: ["chat", "random", "off-topic"],
    icon: "MessageSquare",
  },
  {
    id: "technology",
    title: "Technology",
    description: "Discuss the latest tech news and gadgets",
    category: "tech",
    tags: ["gadgets", "programming", "AI", "software"],
    icon: "Cpu",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Video games, board games, and more",
    category: "gaming",
    tags: ["PC", "console", "RPG", "multiplayer"],
    icon: "Gamepad2",
  },
  {
    id: "movies-tv",
    title: "Movies & TV",
    description: "Discuss your favorite shows and films",
    category: "entertainment",
    tags: ["cinema", "streaming", "Netflix", "Hollywood"],
    icon: "Film",
  },
  {
    id: "music",
    title: "Music",
    description: "Share and discuss your favorite tunes",
    category: "entertainment",
    tags: ["rock", "pop", "hip-hop", "indie"],
    icon: "Music",
  },
  {
    id: "sports",
    title: "Sports",
    description: "All things sports related",
    category: "sports",
    tags: ["football", "basketball", "F1", "tennis"],
    icon: "Trophy",
  },
  {
    id: "science",
    title: "Science",
    description: "Scientific discoveries and discussions",
    category: "science",
    tags: ["space", "biology", "physics", "medicine"],
    icon: "Atom",
  },
  {
    id: "art-design",
    title: "Art & Design",
    description: "Share your creations and get feedback",
    category: "creative",
    tags: ["graphic design", "illustration", "painting", "photography"],
    icon: "Palette",
  },
];
