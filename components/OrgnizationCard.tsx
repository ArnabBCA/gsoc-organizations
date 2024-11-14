import React from "react";
import { Card } from "./ui/card";
import { Organization } from "@/types/types";
import { Badge } from "./ui/badge";

// Update the interface to expect `organization` and `index`
interface OrganizationCardProps {
  index: number;
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  index,
  organization,
}) => {
  return (
    <Card
      key={organization.name}
      className="w-full h-96 flex flex-col hover:shadow-md p-4 justify-center items-center"
    >
      <div className="relative max-w-48 max-h-20 h-full flex items-center justify-center box-border">
        <img
          src={organization.image_url}
          alt={organization.name}
          className="max-h-20"
        />
      </div>

      <div className="w-full flex-grow flex-col text-center">
        <h2 className="text-lg font-semibold">
          {index + 1}. {organization.name}
        </h2>
        <p className="mt-2 text-gray-700">{organization.description}</p>
        <Badge className="bg-primary text-white" variant="outline">
          {organization.category}
        </Badge>
        <div className="w-full">
          {organization.topics.map((topic) => (
            <Badge
              key={topic}
              className="bg-slate-200 text-muted-foreground hover:bg-slate-200"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default OrganizationCard;
