import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineItemType = {
  id: number;
  title: string;
  description?: string;
  status: "done" | "waiting" | "not started";
};

type TimelineProps = {
  items: TimelineItemType[];
};

const statusIcons = {
  done: {
    icon: <CheckCircle className="h-5 w-5" />,
    backgroundColor: "bg-green-500",
  },
  waiting: {
    icon: <Clock className="h-5 w-5" />,
    backgroundColor: "bg-yellow-500",
  },
  "not started": {
    icon: <XCircle className="h-5 w-5" />,
    backgroundColor: "bg-red-500",
  },
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="flex w-full flex-col mt-10">
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4">
          <div className="relative">
            {index !== items.length - 1 && (
              <div
                className={cn(
                  statusIcons[item.status].backgroundColor,
                  "absolute left-1/2 top-5 h-full w-0.5 -translate-x-1/2"
                )}
              ></div>
            )}
            <span
              className={cn(
                statusIcons[item.status].backgroundColor,
                "relative grid h-10 w-10 place-items-center rounded-full text-white"
              )}
            >
              {statusIcons[item.status].icon}
            </span>
          </div>
          <div className="flex-1 mb-10">
            <h1 className="text-xl font-bold text-stone-800 dark:text-white">
              {item.title}
            </h1>
            {item.description && (
              <p className="mt-2 block text-stone-600">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
