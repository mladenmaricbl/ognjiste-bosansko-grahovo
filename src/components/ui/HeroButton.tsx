import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

export function HeroButton({ 
  children, 
  onClick, 
  className,
  variant = "primary" 
}: HeroButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-8 py-4 rounded-md font-medium text-base transition-all duration-300 transform hover:scale-105",
        variant === "primary" && "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl",
        variant === "outline" && "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10",
        className
      )}
    >
      {children}
    </button>
  );
}
