import React from "react";
import { ContactLink } from "@/types/types";
import {
  Facebook,
  Mail,
  MessageCircle,
  NotebookPen,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type ContactLinksProps = {
  contactLinks: ContactLink[];
  direct_comm_methods: ContactLink[];
  social_comm_methods: ContactLink[];
  org: {
    ideas_link: string;
    contributor_guidance_url: string;
  };
};

const linkformat: Record<
  string,
  { icon: React.ReactNode; dispalyName: string }
> = {
  email: {
    icon: <Mail size={18} />,
    dispalyName: "Email",
  },
  blog: {
    icon: <NotebookPen size={18} />,
    dispalyName: "Blog",
  },
  chat: {
    icon: <MessageCircle size={18} />,
    dispalyName: "Chat",
  },
  irc: {
    icon: <MessageCircle size={18} />,
    dispalyName: "IRC",
  },
  twitter: {
    icon: <Twitter size={18} />,
    dispalyName: "Twitter/X",
  },
  facebook: {
    icon: <Facebook size={18} />,
    dispalyName: "Facebook",
  },
  mailinglist: {
    icon: <Mail size={18} />,
    dispalyName: "Mailing List",
  },
  gplus: {
    icon: <Mail size={18} />,
    dispalyName: "Google Workplace",
  },
  "g+": {
    icon: <Mail size={18} />,
    dispalyName: "Google Workplace",
  },
};
const ContactLinks: React.FC<ContactLinksProps> = ({
  contactLinks,
  direct_comm_methods,
  social_comm_methods,
  org,
}) => {
  return (
    <Card className="flex flex-col items-center justify-between p-4 w-full sm:max-w-min h-full gap-4">
      <div className="flex flex-col gap-4 items-center w-full">
        {contactLinks.map((link, i) => (
          <CustomLink key={i} link={link} i={i} />
        ))}
        {direct_comm_methods.map((link, i) => (
          <CustomLink key={i} link={link} i={i} />
        ))}
        {social_comm_methods.map((link, i) => (
          <CustomLink key={i} link={link} i={i} />
        ))}
      </div>
      {(org.ideas_link || org.contributor_guidance_url) && (
        <div className="flex flex-col gap-4 items-center w-full">
          {org.ideas_link && (
            <Link
              className="w-full"
              href={org.ideas_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">Ideas List</Button>
            </Link>
          )}
          {org.contributor_guidance_url && (
            <Link
              className="w-full"
              href={org.contributor_guidance_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full" variant={"secondary"}>
                Contributor Guide
              </Button>
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};

interface CustomLinkProps {
  link: ContactLink;
  i: number;
}

const CustomLink: React.FC<CustomLinkProps> = ({ link, i }) => {
  return (
    <Link
      key={i}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center gap-2 justify-center sm:justify-start"
      href={
        link.value.includes("@")
          ? `mailto:${link.value}`
          : link.value.startsWith("http")
          ? link.value
          : `https://${link.value}`
      }
    >
      {linkformat[link.name]?.icon}
      <p className="text-center whitespace-nowrap flex items-center gap-2 text-sm">
        {linkformat[link.name]?.dispalyName}
      </p>
    </Link>
  );
};

export default ContactLinks;
