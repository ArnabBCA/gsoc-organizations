import React from "react";
import { Button } from "./ui/button";
import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SocialLinks = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, "flex items-center gap-4")}>
      <Link
        className="group "
        href={"https://github.com/ArnabBCA/gsoc-organizations"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="font-normal w-32 group-hover:font-medium text-neutral-800"
          variant={"outline"}
        >
          <Github className="text-neutral-800 group-hover:fill-neutral-800" />
          Github
        </Button>
      </Link>
      <Link
        className="group "
        href={"https://github.com/sponsors/ArnabBCA"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="font-normal w-32 text-neutral-800 group-hover:font-medium"
          variant={"outline"}
        >
          <Heart className="text-pink-500 group-hover:fill-pink-500" />
          Sponsor
        </Button>
      </Link>
    </div>
  );
};

export default SocialLinks;
