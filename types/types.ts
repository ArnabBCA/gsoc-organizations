export type Organization = {
  name: string;
  nav_url: string;
  description: string;
  url: string;
  image_url: string;
  category: string;
  topics: string[];
  technologies: string[];
  years_appeared: number[];
  image_background_color: string;
};

export type Category = {
  name: string;
  count: number;
};
