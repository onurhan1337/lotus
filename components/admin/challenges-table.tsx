"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { Badge } from "../ui/badge";

interface AdminChallengesTableProps {
  name: string;
  status: string;
  participants: number;
  duration: string;
  onEdit: () => void;
  onDelete: () => void;
}

const dummyData: AdminChallengesTableProps[] = [
  {
    name: "Laser Lemonade Machine",
    status: "Draft",
    participants: 25,
    duration: "30 days",
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    name: "Hypernova Headphones",
    status: "Active",
    participants: 100,
    duration: "10 days",
    onEdit: () => {},
    onDelete: () => {},
  },
  {
    name: "AeroGlow Desk Lamp",
    status: "Finished",
    participants: 50,
    duration: "1 month",
    onEdit: () => {},
    onDelete: () => {},
  },
];

export default function AdminChallengesTable() {
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
          <Button size="sm">Create Challenge</Button>
        </div>
      </div>
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
          {dummyData.map((challenge) => (
            <TableRow key={challenge.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{challenge.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={"outline"}>{challenge.status}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {challenge.participants}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {challenge.duration}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={challenge.onEdit}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={challenge.onDelete}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
