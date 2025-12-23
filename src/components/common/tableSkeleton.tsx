import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "./DataTable/DataTable.styled";
import { Skeleton } from "../../pages/emailAccounts/EmailAccounts.styled";
import { SkeletonIcon } from "../../pages/emailAccounts/EmailAccounts.styled";

interface SkeletonColumn {
  width?: string;
}

interface TableSkeletonProps {
  rows?: number;
  columns: SkeletonColumn[];
  selectable?: boolean;
  showRowActions?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 8,
  columns,
  selectable = false,
  showRowActions = false,
}) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {selectable && (
            <TableCell>
              <Checkbox disabled />
            </TableCell>
          )}

          {columns.map((col, idx) => (
            <TableCell key={idx}>
              <Skeleton $width={col.width || "120px"} $height="16px" />
            </TableCell>
          ))}

          {showRowActions && (
            <TableCell $align="center">
              <SkeletonIcon />
              <SkeletonIcon />
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};
