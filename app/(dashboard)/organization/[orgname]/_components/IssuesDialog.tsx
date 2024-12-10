import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

export function IssuesDialog({ issueList }: { issueList: Array<any> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="self-end">
          View Issues
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-4">
        <DialogHeader>
          <DialogTitle>All open unassigned good first issues</DialogTitle>
          <DialogDescription>
            Click on a issue to view it on GitHub.
          </DialogDescription>
        </DialogHeader>
        <DataTable columns={columns} data={issueList} />
      </DialogContent>
    </Dialog>
  );
}
