import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="rounded-lg cursor-pointer text-center">
      <div className="flex items-cente justify-center gap-1">
        <p>Made with ❤️ by</p>
        <Link
          href="https://github.com/ArnabBCA"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-primary"
        >
          Arnab Ghosh
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">{"- GSoC'24 mentee"}</p>
    </div>
  );
};

export default Footer;
