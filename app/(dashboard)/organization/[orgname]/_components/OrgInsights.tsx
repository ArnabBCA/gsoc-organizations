import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Organization } from "@prisma/client";
import { CircleDot } from "lucide-react";
import React from "react";

const OrgInsights = (props: Organization) => {
  return (
    <div className="w-full flex flex-col gap-4 sm:flex-col md:flex-row">
      <Card className="p-4 w-full flex flex-col justify-between gap-4">
        <div className="flex justify-between gap-4">
          <CircleDot className="text-green-500" />
          <div className="flex items-center flex-wrap gap-1 justify-end">
            <Badge className="bg-blue-500 hover:bg-blue-500 pt-0">all</Badge>
            <Badge className="bg-red-500 hover:bg-red-500 pt-0">open</Badge>
            <Badge className="bg-green-500 hover:bg-green-500 pt-0">
              issues
            </Badge>
          </div>
        </div>
        <h1 className="text-5xl font-bold">{props.openIssues}</h1>
      </Card>
      <Card className="p-4 w-full flex flex-col justify-between">
        <div className="flex justify-between gap-4">
          <CircleDot className="text-green-500 min-w-5"/>
          <div className="flex items-center flex-wrap gap-1 justify-end">
            <Badge className="bg-blue-500 hover:bg-blue-500 pt-0">all</Badge>
            <Badge className="bg-red-500 hover:bg-red-500 pt-0">open</Badge>
            <Badge className="bg-yellow-500 hover:bg-yellow-500 pt-0">
              unassigned
            </Badge>
            <Badge className="bg-green-500 hover:bg-green-500 pt-0">
              issues
            </Badge>
          </div>
        </div>
        <h1 className="text-5xl font-bold">{props.openUnassignedIssues}</h1>
      </Card>
      <Card className="p-4 w-full flex flex-col justify-between">
        <div className="flex justify-between gap-4">
          <CircleDot className="text-green-500" />
          <div className="flex items-center flex-wrap gap-1 justify-end">
            <Badge className="bg-blue-500 hover:bg-blue-500 pt-0">all</Badge>
            <Badge className="bg-red-500 hover:bg-red-500 pt-0">open</Badge>
            <Badge className="bg-yellow-500 hover:bg-yellow-500 pt-0">
              unassigned
            </Badge>
            <Badge className="bg-violet-500 hover:bg-violet-500 pt-0">
              good first issues
            </Badge>
          </div>
        </div>
        <h1 className="text-5xl font-bold">
          {props.openUnassignedGoodFirstIssues}
        </h1>
      </Card>
    </div>
  );
};

export default OrgInsights;
