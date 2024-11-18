"use client";
import OrganizationChartClient from "@/components/OrganizationChartClient";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="p-4">
        {children}
        <OrganizationChartClient />
      </div>
    </div>
  );
};

export default layout;
