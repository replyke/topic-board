import { useState } from "react";
import TopicCard from "@/components/home-page/TopicCard";
import SidebarFilters from "@/components/home-page/SidebarFilters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { topics } from "../constants/topics";

function HomePage() {
  // State for active category filter and sort method
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter and sort topics based on active filters
  const filteredTopics = topics.filter(
    (topic) => activeCategory === "all" || topic.category === activeCategory
  );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="container grid grid-cols-1 gap-6 pb-6 md:grid-cols-4 lg:gap-10">
      <div className="hidden md:block">
        <SidebarFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="md:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {activeCategory === "all"
              ? "All Topics"
              : `${
                  activeCategory.charAt(0).toUpperCase() +
                  activeCategory.slice(1)
                } Topics`}
          </h1>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Filters
                </Button>
              </SheetTrigger>
              <SheetHeader className="hidden">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Filter which topics are visible
                </SheetDescription>
              </SheetHeader>
              <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
                <div className="p-4">
                  <SidebarFilters
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {filteredTopics.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No topics found</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
