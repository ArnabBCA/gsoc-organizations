import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import YearNavbar from "./YearNavbar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PastProjects = ({ projects }: { projects: any[] }) => {
  const projectYears = Array.from(
    new Set(projects.map((project) => project.program_slug))
  ).sort((a, b) => b - a);
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-4 flex flex-col gap-4 items-center justify-between sm:flex-row">
        <CardTitle className="text-lg">Past Successful Projects</CardTitle>
        <YearNavbar projectYears={projectYears} />
      </Card>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => {
          return (
            <Card
              key={index}
              className={`p-4 flex flex-col justify-between gap-4 project-year ${project.program_slug}`}
              style={{ display: "none" }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>
                    {project.contributor_display_name}
                  </CardDescription>
                </div>
                <p>{project.abstract_short}</p>
              </div>
              <div className="flex justify-between gap-4">
                <Link
                  className="w-full"
                  href={`https://summerofcode.withgoogle.com/archive/${project.program_slug}/projects/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:text-green-600 w-full h-full hover:bg-green-50 whitespace-pre-line [word-spacing:100vw]"
                  >
                    More Details
                  </Button>
                </Link>
                <Link
                  className="w-full"
                  href={project.project_code_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:text-primary w-full h-full hover:bg-primary/5 whitespace-pre-line [word-spacing:100vw]"
                  >
                    Code Submission
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PastProjects;
