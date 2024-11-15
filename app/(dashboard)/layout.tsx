"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default layout;
