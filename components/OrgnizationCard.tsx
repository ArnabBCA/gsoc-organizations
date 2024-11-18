import React from "react";
import { Card } from "./ui/card";
import { Organization } from "@/types/types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";

interface OrganizationCardProps {
  index: number;
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
}) => {
  return (
    <Card
      key={organization.name}
      className="w-full flex h-full flex-col hover:shadow-md items-center organization-card overflow-hidden hiding"
    >
      <Link
        href={`/organization/${organization.nav_url}`}
        className="w-full h-full flex items-center justify-center flex-col"
      >
        <div
          className="w-full h-28 flex items-center justify-center p-4"
          style={{ backgroundColor: organization.image_background_color }}
        >
          <div className="relative w-48 h-20 flex items-center justify-center box-border">
            <Image
              src={organization.image_url}
              alt={organization.name}
              fill
              sizes="150px"
              className="object-contain max-h-20"
            />
          </div>
        </div>
        <div className="w-full flex-grow flex-col text-center px-4 pb-4">
          <div className="flex flex-col my-2">
            <h2 className="text-lg font-semibold org-name">
              {organization.name}
            </h2>
            <p className="mt-2 text-gray-700">{organization.description}</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full">
              <Badge
                className="bg-primary text-white org-category"
                variant="outline"
              >
                {organization.category}
              </Badge>
            </div>
            <div className="w-full">
              {organization.years_appeared.map((year) => (
                <Badge
                  key={year}
                  className="bg-green-600 text-muted-foreground hover:bg-green-600 text-white org-year"
                >
                  {year}
                </Badge>
              ))}
            </div>
            <div className="w-full">
              {organization.topics.slice(0, 5).map((topic) => (
                <Badge
                  key={topic}
                  className="bg-slate-200 text-muted-foreground hover:bg-slate-200"
                >
                  {topic}
                </Badge>
              ))}
              {organization.topics.length > 5 && (
                <Badge className="bg-slate-200 text-muted-foreground hover:bg-slate-200">
                  {`+${organization.topics.length - 5}`}
                </Badge>
              )}
            </div>
            <div className="w-full">
              {organization.technologies.slice(0, 5).map((tech) => (
                <Badge
                  key={tech}
                  className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white"
                >
                  {tech}
                </Badge>
              ))}
              {organization.technologies.length > 5 && (
                <Badge className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white">
                  {`+${organization.technologies.length - 5}`}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default OrganizationCard;
