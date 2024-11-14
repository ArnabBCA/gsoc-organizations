"use client";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen">{children}</div>;
};

export default layout;
