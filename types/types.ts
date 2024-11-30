export type Organization = {
  name: string;
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
  num_projects: number;
  projects: any[];
  projects_by_year: { [year: string]: number };
};

export type ContactLink = {
  name: "email" | "mailinglist" | "chat" | "twitter" | "blog" | "irc";
  value: string;
  url?: string;
};

export type Category = {
  name: string;
  count: number;
};
