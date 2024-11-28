"use client";
import { OrganizationChart } from "@/components/OrganizationChart";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex max-w-7xl p-4">
        <div className="w-full flex gap-4">
          <div className="max-w-96">{children}</div>
          <OrganizationChart />
        </div>
      </div>
    </div>
  );
};

export default layout;
