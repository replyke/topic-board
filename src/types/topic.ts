// Define Topic Interface
export interface Topic {
  id: string;
  title: string;
  description: string;
  postsCount: number;
  threadsCount: number;
  lastActive: string; // ISO string representation of date
  category: string;
  tags: string[];
  icon: string;
}
