import React from "react";
import { ContactLink } from "@/types/types";
import { Card } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

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
    <Card className="p-4 flex items-center flex-col min-w-56 gap-2 h-full w-full sm:w-auto">
      <h2 className="text-lg font-semibold org-name">Contact Links</h2>
      <div className="w-full flex flex-wrap gap-2">
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
      <Separator />
      <h2 className="text-lg font-semibold org-name">Accepted Proposals</h2>
    </Card>
  );
};

export default ContactLinks;
