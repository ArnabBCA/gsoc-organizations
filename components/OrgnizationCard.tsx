import React from "react";
import { Organization } from "@/types/types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "@/components/MyImage";
import { cn } from "@/lib/utils";
import StarButton from "./StarButton";

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
    <Link
      key={organization.name}
      href={`/organization/${organization.nav_url}`}
      className={cn(
        isLandingPage && "relative hover:shadow-md",
        "group max-w-full sm:max-w-lg w-full h-full organization-card rounded-lg border bg-card text-card-foreground shadow-xs flex flex-col items-center hiding p-4 gap-2"
      )}
    >
      <StarButton navUrl={organization.name} />
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
        <h2
          className={cn(
            organization.is_first_time_org && "org-first-time",
            "text-lg font-semibold org-name"
          )}
        >
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
              className="bg-slate-200 text-muted-foreground hover:bg-slate-200 org-topic"
            >
              {topic}
            </Badge>
          ) : (
            <span key={topic} className="hidden org-topic">
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
              className="bg-blue-700 text-muted-foreground hover:bg-blue-700 text-white org-tech"
            >
              {tech}
            </Badge>
          ) : (
            <span key={tech} className="hidden org-tech">
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
  );
};

export default OrganizationCard;
