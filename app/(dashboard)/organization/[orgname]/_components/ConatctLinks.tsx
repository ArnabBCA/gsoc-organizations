import React from "react";
import { ContactLink } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Globe, Mail, MessageCircle, NotebookPen, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    mailinglist: <Globe />,
  };

  return (
    <Card className="p-4 flex gap-2">
      {contactLinks.map(
        (link) =>
          link.value !== undefined && (
            <React.Fragment key={link.name}>
              <Link
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
            </React.Fragment>
          )
      )}
    </Card>
  );
};

export default ContactLinks;
