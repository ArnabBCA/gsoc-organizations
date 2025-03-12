"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Navbar />
      <main className="flex max-w-6xl w-full">{children}</main>
    </div>
  );
};

export default layout;
