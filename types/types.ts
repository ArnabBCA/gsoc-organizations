export type Organization = {
  name: string;
  nav_url: string;
  tagline: string;
  website_url: string;
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

export type Category = {
  name: string;
  count: number;
};
