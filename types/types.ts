export type Organization = {
  name: string;
  last_arrived_year: number;
  nav_url: string;
  tagline: string;
  website_url: string;
  contact_links: ContactLink[];
  logo_url: string;
  logo_bg_color: string;
  categories: string[];
  topic_tags: string[];
  tech_tags: string[];
  years_appeared: number[];
  projects: any[];
  projects_by_year: { [year: string]: number };
};

export type ContactLink = {
  name:
    | "mailinglist"
    | "email"
    | "chat"
    | "twitter"
    | "blog"
    | "irc"
    | "facebook"
    | "gplus"
    | "g+";
  value: string;
};
