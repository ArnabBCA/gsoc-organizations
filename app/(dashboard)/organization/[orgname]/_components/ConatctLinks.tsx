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
};

const ContactLinks: React.FC<ContactLinksProps> = ({ contactLinks }) => {
  const linkformat: Record<
    string,
    { icon: React.ReactNode; dispalyName: string }
  > = {
    email: {
      icon: <Mail />,
      dispalyName: "Email",
    },
    blog: {
      icon: <NotebookPen />,
      dispalyName: "Blog",
    },
    chat: {
      icon: <MessageCircle />,
      dispalyName: "Chat",
    },
    irc: {
      icon: <MessageCircle />,
      dispalyName: "IRC",
    },
    twitter: {
      icon: <Twitter />,
      dispalyName: "Twitter / X",
    },
    facebook: {
      icon: <Facebook />,
      dispalyName: "Facebook",
    },
    mailinglist: {
      icon: <Mail />,
      dispalyName: "Mailing List / Forum",
    }
  };

  return (
    <Card className="w-full flex flex-col gap-4 items-center p-4 max-w-min h-full">
      {contactLinks.map((link, i) => (
        <Link
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2"
          href={
            link.value.includes("@")
              ? `mailto:${link.value}`
              : link.value.startsWith("http")
              ? link.value
              : `https://${link.value}`
          }
        >
          <Button variant="secondary" size="icon">
            {linkformat[link.name]?.icon}
          </Button>
          <p className="text-center whitespace-nowrap">{linkformat[link.name]?.dispalyName}</p>
        </Link>
      ))}
    </Card>
  );
};

export default ContactLinks;
