"use client";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex max-w-6xl w-full">{children}</div>
    </div>
  );
};

export default layout;
