import { Topic } from "./types/topic";

// Define User Interface
interface User {
  id: string;
  username: string;
}

// Sample users data
const users: User[] = [
  { id: "user1", username: "lionel_messi10" },
  { id: "user2", username: "diego_maradona" },
  { id: "user3", username: "pele" },
  { id: "user4", username: "ronaldo" },
];

/**
 * Converts relative time to an ISO date string.
 * @param relativeTime - A string like "5min ago" or "2hr ago"
 * @returns ISO formatted date string
 */
function convertToDateString(relativeTime: string): string {
  const now = new Date();
  const timeMap: Record<string, number> = {
    min: 60 * 1000,
    hr: 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
  };

  const match = relativeTime.match(/(\d+)\s*(min|hour|hr)/);
  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    now.setTime(now.getTime() - value * timeMap[unit]);
  }

  return now.toISOString(); // Returns ISO formatted date string
}

// Sample forum topics data with converted dates
const topics: Topic[] = [
  {
    id: "general",
    title: "General",
    description: "Talk about anything and everything",
    postsCount: 1243,
    threadsCount: 89,
    lastActive: convertToDateString("5min ago"),
    category: "general",
    tags: ["chat", "random", "off-topic"],
    icon: "MessageSquare",
  },
  {
    id: "technology",
    title: "Technology",
    description: "Discuss the latest tech news and gadgets",
    postsCount: 3456,
    threadsCount: 234,
    lastActive: convertToDateString("10min ago"),
    category: "tech",
    tags: ["gadgets", "programming", "AI", "software"],
    icon: "Cpu",
  },
  {
    id: "gaming",
    title: "Gaming",
    description: "Video games, board games, and more",
    postsCount: 5678,
    threadsCount: 432,
    lastActive: convertToDateString("15min ago"),
    category: "gaming",
    tags: ["PC", "console", "RPG", "multiplayer"],
    icon: "Gamepad2",
  },
  {
    id: "movies-tv",
    title: "Movies & TV",
    description: "Discuss your favorite shows and films",
    postsCount: 2345,
    threadsCount: 178,
    lastActive: convertToDateString("30min ago"),
    category: "entertainment",
    tags: ["cinema", "streaming", "Netflix", "Hollywood"],
    icon: "Film",
  },
  {
    id: "music",
    title: "Music",
    description: "Share and discuss your favorite tunes",
    postsCount: 1987,
    threadsCount: 145,
    lastActive: convertToDateString("1 hour ago"),
    category: "entertainment",
    tags: ["rock", "pop", "hip-hop", "indie"],
    icon: "Music",
  },
  {
    id: "sports",
    title: "Sports",
    description: "All things sports related",
    postsCount: 3210,
    threadsCount: 267,
    lastActive: convertToDateString("45min ago"),
    category: "sports",
    tags: ["football", "basketball", "F1", "tennis"],
    icon: "Trophy",
  },
  {
    id: "science",
    title: "Science",
    description: "Scientific discoveries and discussions",
    postsCount: 1543,
    threadsCount: 123,
    lastActive: convertToDateString("2hr ago"),
    category: "science",
    tags: ["space", "biology", "physics", "medicine"],
    icon: "Atom",
  },
  {
    id: "art-design",
    title: "Art & Design",
    description: "Share your creations and get feedback",
    postsCount: 1876,
    threadsCount: 156,
    lastActive: convertToDateString("3hr ago"),
    category: "creative",
    tags: ["graphic design", "illustration", "painting", "photography"],
    icon: "Palette",
  },
];

export { users, topics };
