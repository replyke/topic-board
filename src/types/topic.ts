import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// Define Topic Interface
export interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
