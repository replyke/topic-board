import { Link } from "react-router-dom";
import {
  MessageSquare,
  Cpu,
  Gamepad2,
  Film,
  Music,
  Trophy,
  Atom,
  Palette,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Topic } from "../../types/topic";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  // Map of icon names to components
  const iconMap = {
    MessageSquare: MessageSquare,
    Cpu: Cpu,
    Gamepad2: Gamepad2,
    Film: Film,
    Music: Music,
    Trophy: Trophy,
    Atom: Atom,
    Palette: Palette,
  };

  // Get the icon component or default to MessageSquare
  const IconComponent =
    iconMap[topic.icon as keyof typeof iconMap] || MessageSquare;

  // Map categories to badge colors
  const categoryColorMap: Record<string, string> = {
    general: "bg-gray-100 text-gray-800",
    tech: "bg-blue-100 text-blue-800",
    gaming: "bg-purple-100 text-purple-800",
    entertainment: "bg-pink-100 text-pink-800",
    sports: "bg-green-100 text-green-800",
    science: "bg-cyan-100 text-cyan-800",
    creative: "bg-amber-100 text-amber-800",
  };

  const badgeClass =
    categoryColorMap[topic.category] || "bg-gray-100 text-gray-800";

  return (
    <Link to={`/topics/${topic.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md gap-3">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{topic.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
