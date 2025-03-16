import React from "react";
import { Organization } from "@/types/types";
import Link from "next/link";
import Image from "@/components/MyImage";
import { cn } from "@/lib/utils";
import StarButton from "./StarButton";
import { Badge } from "./ui/badge";

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
    <Link
      key={organization.name}
      href={`/organization/${organization.nav_url}`}
      className={cn(
        isLandingPage && "relative hover:shadow-md",
        "group max-w-full sm:max-w-lg w-full h-full organization-card rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center hiding p-4 gap-2"
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
        <CustomBadge
          dataArray={organization.categories}
          color="primary"
          className="org-category"
        />
        <br />
        <CustomBadge
          dataArray={organization.years_appeared}
          color="green"
          className="org-year"
        />
        <br />
        <CustomBadge
          dataArray={organization.topic_tags}
          color="gray"
          className="org-topic"
        />
        <br />
        <CustomBadge
          dataArray={organization.tech_tags}
          color="blue"
          className="org-tech"
        />
      </div>
    </Link>
  );
};

export default OrganizationCard;

interface CustomBadgeProps {
  dataArray: number[] | string[];
  color: "primary" | "green" | "gray" | "blue";
  className?: string;
}

const CustomBadge = (props: CustomBadgeProps) => {
  return (
    <>
      {props.dataArray.map((data) => (
        <Badge
          key={data}
          
          className={cn(
            props.color === "primary"
              ? "bg-primary text-white"
              : props.color === "green"
              ? "bg-green-600 text-white"
              : props.color === "gray"
              ? "bg-slate-200 text-muted-foreground"
              : "bg-blue-700 text-white",
            "mr-1 border-0 rounded-full"
          )}
        >
          {data}
        </Badge>
      ))}
    </>
  );
};
