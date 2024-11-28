import React from "react";
import { Card } from "./ui/card";
import { Organization } from "@/types/types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OrganizationCardProps {
  index?: number;
  isLandingPage: boolean;
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  isLandingPage,
  organization,
}) => {
  return (
    <Card
      key={organization.name}
      className={cn(
        isLandingPage && "hover:shadow-md",
        "w-full flex h-full flex-col items-center organization-card overflow-hidden hiding"
      )}
    >
      <Link
        href={`/organization/${organization.nav_url}`}
        className="w-full h-full flex items-center justify-center flex-col"
      >
        <div
          className="w-full h-28 flex items-center justify-center p-4"
          style={{
            backgroundColor:
              organization.logo_bg_color != null
                ? `#${organization.logo_bg_color}`
                : "",
          }}
        >
          <div className="relative w-48 h-20 flex items-center justify-center box-border">
            <Image
              src={organization.logo_url}
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
            <p className="mt-2 text-gray-700">{organization.tagline}</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full">
              {organization.categories.map((category) => (
                <Badge
                  key={category}
                  className="bg-primary text-white org-category"
                  variant="outline"
                >
                  {category}
                </Badge>
              ))}
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
              {organization.topic_tags.slice(0, 5).map((topic) => (
                <Badge
                  key={topic}
                  className="bg-slate-200 text-muted-foreground hover:bg-slate-200"
                >
                  {topic}
                </Badge>
              ))}
              {organization.topic_tags.length > 5 && (
                <Badge className="bg-slate-200 text-muted-foreground hover:bg-slate-200">
                  {`+${organization.topic_tags.length - 5}`}
                </Badge>
              )}
            </div>
            <div className="w-full">
              {organization.tech_tags.slice(0, 5).map((tech) => (
                <Badge
                  key={tech}
                  className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white"
                >
                  {tech}
                </Badge>
              ))}
              {organization.tech_tags.length > 5 && (
                <Badge className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white">
                  {`+${organization.tech_tags.length - 5}`}
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
