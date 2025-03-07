import React from "react";
import { ContactLink } from "@/types/types";
import {
  Facebook,
  Globe,
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
};

const ContactLinks: React.FC<ContactLinksProps> = ({ contactLinks }) => {
  const iconMap: Record<string, React.ReactNode> = {
    email: <Mail />,
    blog: <NotebookPen />,
    chat: <MessageCircle />,
    irc: <MessageCircle />,
    twitter: <Twitter />,
    facebook: <Facebook />,
    mailinglist: <Globe />,
  };

  return (
    <div className="w-full flex flex-wrap gap-2 items-center justify-center">
      {contactLinks.map(
        (link, i) =>
          link.value !== undefined && (
            <Link
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              href={
                link.value?.startsWith("http")
                  ? link.value
                  : `https://${link.value}`
              }
            >
              <Button variant="secondary" size="icon">
                {iconMap[link.name]}
              </Button>
            </Link>
          )
      )}
    </div>
  );
};

export default ContactLinks;
