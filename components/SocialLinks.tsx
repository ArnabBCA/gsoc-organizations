import React from "react";
import { Button } from "./ui/button";
import { Github, Heart } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        className="group font-normal hover:font-medium text-neutral-800"
        variant={"outline"}
      >
        <Github className="group-hover:fill-black" />
        Github
      </Button>
      <Button
        className="group font-normal text-neutral-800 hover:font-medium"
        variant={"outline"}
      >
        <Heart className="text-pink-500 group-hover:fill-pink-500" />
        Sponsor
      </Button>
    </div>
  );
};

export default SocialLinks;
