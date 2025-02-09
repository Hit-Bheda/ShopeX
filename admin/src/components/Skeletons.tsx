import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}

export function CategoryTableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <SingleRow key={index} />
      ))}
      <SingleRow />
    </>
  );
}

const SingleRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className=" h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5" />
      </TableCell>
    </TableRow>
  );
};
