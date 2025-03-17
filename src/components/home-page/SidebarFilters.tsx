import { Home, Cpu, Gamepad2, Film, Trophy, Atom, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SidebarFilters({
  activeCategory,
  onCategoryChange,
}: SidebarFiltersProps) {
  // Category options
  const categories = [
    { name: "General", value: "general", icon: Home },
    { name: "Technology", value: "tech", icon: Cpu },
    { name: "Gaming", value: "gaming", icon: Gamepad2 },
    { name: "Entertainment", value: "entertainment", icon: Film },
    { name: "Sports", value: "sports", icon: Trophy },
    { name: "Science", value: "science", icon: Atom },
    { name: "Creative", value: "creative", icon: Palette },
  ];

  return (
    <div className="sticky top-20 w-full">
      <div className="mb-4">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            <Button
              variant={activeCategory === "all" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategoryChange("all")}
            >
              <Home className="mr-2 h-4 w-4" />
              All Topics
            </Button>
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.value;

              return (
                <Button
                  key={category.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onCategoryChange(category.value)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
