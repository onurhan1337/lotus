import { getAllChallenges } from "@/actions/challenge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChallengeParticipant, ChallengeStatus } from "@prisma/client";
import { formatDate } from "date-fns";
import { ListFilter, Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminChallengeCreateDialog from "./challenge-create-dialog";
import AdminChallengesTableToolbar from "./challenges-table-toolbar";

type Challenges = {
  id: string;
  name: string;
  description: string;
  maxParticipants: number | null;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
  registrationDeadline: Date | null;
  startDate: Date;
  endDate: Date;
  isActive: ChallengeStatus;
  participants?: ChallengeParticipant[];
}[];

export default async function AdminChallengesTable() {
  const challenges: Challenges = await getAllChallenges();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative mr-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AdminChallengeCreateDialog />
        </div>
      </div>{" "}
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Participants</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {challenges.map((challenge) => (
            <TableRow key={challenge.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{challenge.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={"outline"}>{challenge.isActive}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {challenge.participants?.length}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(new Date(challenge.startDate), "MMM dd, yyyy") +
                  " - " +
                  formatDate(new Date(challenge.endDate), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <AdminChallengesTableToolbar id={challenge.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
