import React from "react";
import { Organization } from "@/types/types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ConatctLinks from ".././app/(dashboard)/organization/[orgname]/_components/ConatctLinks";

interface OrganizationCardProps {
  index?: number;
  isLandingPage: boolean;
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  isLandingPage,
  organization,
}) => {
  const numberOfTags = 5;
  return (
    <div
      className={cn(
        isLandingPage && "hover:shadow-md",
        "w-full h-full organization-card rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center overflow-hidden hiding p-4 gap-4"
      )}
    >
      <Link
        key={organization.name}
        href={`/organization/${organization.nav_url}`}
        className="flex items-center w-full flex-col gap-2"
      >
        <div
          className="relative w-48 h-20 flex items-center justify-center box-border "
          style={{
            backgroundColor:
              organization.logo_bg_color != null
                ? `#${organization.logo_bg_color}`
                : "",
          }}
        >
          <Image
            src={organization.logo_url}
            alt={organization.name}
            fill
            sizes="150px"
            className="object-contain max-h-20"
          />
        </div>
        <div className="w-full flex-col text-center gap-1">
          <h2 className="text-lg font-semibold org-name">
            {organization.name}
          </h2>
          <p className="pb-2 text-gray-700">{organization.tagline}</p>
          {organization.categories.map((category) => (
            <Badge
              key={category}
              className="bg-primary text-white org-category"
              variant="outline"
            >
              {category}
            </Badge>
          ))}
          <br />
          {organization.years_appeared.map((year) => (
            <Badge
              key={year}
              className="bg-green-600 text-muted-foreground hover:bg-green-600 text-white org-year"
            >
              {year}
            </Badge>
          ))}
          <br />
          {organization.topic_tags.map((topic, i) =>
            i < numberOfTags ? (
              <Badge
                key={topic}
                className="bg-slate-200 text-muted-foreground hover:bg-slate-200"
              >
                {topic}
              </Badge>
            ) : (
              <span key={topic} className="hidden">
                {topic}
              </span>
            )
          )}
          {organization.topic_tags.length > numberOfTags && (
            <Badge className="bg-slate-200 text-muted-foreground hover:bg-slate-200">
              {`+${organization.topic_tags.length - numberOfTags}`}
            </Badge>
          )}
          <br />
          {organization.tech_tags.map((tech: string, i: number) =>
            i < numberOfTags ? (
              <Badge
                key={tech}
                className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white"
              >
                {tech}
              </Badge>
            ) : (
              <span key={tech} className="hidden">
                {tech}
              </span>
            )
          )}
          {organization.tech_tags.length > numberOfTags && (
            <Badge className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white">
              {`+${organization.tech_tags.length - numberOfTags}`}
            </Badge>
          )}
        </div>
      </Link>
      {!isLandingPage && (
        <ConatctLinks contactLinks={organization.contact_links} />
      )}
    </div>
  );
};

export default OrganizationCard;
