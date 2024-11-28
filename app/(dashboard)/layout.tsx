"use client";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="">{children}</div>
    </div>
  );
};

export default layout;
