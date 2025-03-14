import React from "react";
import Timeline, { TimelineItemType } from "./_components/Timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Google Summer of Code 2025 timeline",
  keywords:
    "Google Summer of Code, GSoC 2025, GSoC timeline, Google Summer of Code timeline",
};

const timelineData: TimelineItemType[] = [
  {
    id: 1,
    title: "January 27 - 18:00 UTC",
    description:
      "Mentoring organizations can begin submitting applications to Google",
    status: "done",
  },
  {
    id: 2,
    title: "February 11 - 18:00 UTC",
    description: "Mentoring organization application deadline",
    status: "done",
  },
  {
    id: 3,
    title: "February 11 - 26",
    description:
      "Google program administrators review organization applications",
    status: "done",
  },
  {
    id: 4,
    title: "February 27 - 18:00 UTC",
    description: "List of accepted mentoring organizations published",
    status: "done",
  },
  {
    id: 5,
    title: "February 27 - March 24",
    description:
      "Potential GSoC contributors discuss application ideas with mentoring organizations",
    status: "waiting",
  },
  {
    id: 6,
    title: "March 24 - 18:00 UTC",
    description: "GSoC contributor application period begins",
    status: "not started",
  },
  {
    id: 7,
    title: "April 8 - 18:00 UTC",
    description: "GSoC contributor application deadline",
    status: "not started",
  },
  {
    id: 8,
    title: "April 29 - 18:00 UTC",
    description: "GSoC contributor proposal rankings due from Org Admins",
    status: "not started",
  },
  {
    id: 9,
    title: "May 8 - 18:00 UTC",
    description: "Accepted GSoC contributor projects announced",
    status: "not started",
  },
  {
    id: 10,
    title: "May 8 - June 1",
    description:
      "Community Bonding Period | GSoC contributors get to know mentors, read documentation, get up to speed to begin working on their projects",
    status: "not started",
  },
  {
    id: 11,
    title: "June 2",
    description: "Coding officially begins!",
    status: "not started",
  },
  {
    id: 12,
    title: "July 14 - 18:00 UTC",
    description:
      "Mentors and GSoC contributors can begin submitting midterm evaluations (for standard 12-week coding projects)",
    status: "not started",
  },
  {
    id: 13,
    title: "July 18 - 18:00 UTC",
    description: "Midterm evaluation deadline (standard coding period)",
    status: "not started",
  },
  {
    id: 14,
    title: "July 14 - August 25",
    description:
      "Work Period | GSoC contributors work on their project with guidance from Mentors",
    status: "not started",
  },
  {
    id: 15,
    title: "August 25 - September 1 - 18:00 UTC",
    description:
      "Final week: GSoC contributors submit their final work product and their final mentor evaluation (standard coding period)",
    status: "not started",
  },
  {
    id: 16,
    title: "September 1 - 8 - 18:00 UTC",
    description:
      "Mentors submit final GSoC contributor evaluations (standard coding period)",
    status: "not started",
  },
  {
    id: 17,
    title: "September 1 - November 9",
    description: "GSoC contributors with extended timelines continue coding",
    status: "not started",
  },
  {
    id: 18,
    title: "November 10 - 18:00 UTC",
    description:
      "Final date for all GSoC contributors to submit their final work product and final evaluation",
    status: "not started",
  },
  {
    id: 19,
    title: "November 17 - 18:00 UTC",
    description:
      "Final date for mentors to submit evaluations for GSoC contributor projects with extended deadlines",
    status: "not started",
  },
];
const MyComponent = () => {
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-neutral-700 mb-4">
        Google Summer of Code 2025 Timeline
      </h1>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://developers.google.com/open-source/gsoc/timeline"
        className="max-w-min"
      >
        <Button>View official data source</Button>
      </Link>
      <Timeline items={timelineData} />
      <Footer />
    </div>
  );
};

export default MyComponent;
