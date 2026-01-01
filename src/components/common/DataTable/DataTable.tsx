import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit2,
  Trash2,
  Inbox,
} from "lucide-react";
import {
  TableContainer,
  TableWrapper,
  TableHeader,
  TableTitle,
  TableActions,
  SearchInput,
  SearchWrapper,
  IconButton,
  DangerButton,
  BulkActions,
  SelectedCount,
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  RowActions,
  RowActionButton,
  EmptyState,
  Pagination,
  PaginationInfo,
  PaginationControls,
  PageButton,
  RowsPerPage,
  FilterDropdown,
  FilterOption,
  FilterWrapper,
  Badge,
} from "./DataTable.styled";
import { TableSkeleton } from "../tableSkeleton";
import { Button } from "../Button.tsx";

export interface Column {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  filterOptions?: { value: string; label: string }[];
  render?: (
    value: unknown,
    row: Record<string, unknown>,
    index: number
  ) => React.ReactNode;
}

export interface FilterState {
  [key: string]: string[];
}

export interface SortState {
  key: string;
  direction: "asc" | "desc";
}

export interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  title?: string;
  showCount?: boolean;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: string[];
  onSearch?: (query: string) => void;
  filterable?: boolean;
  onFilterChange?: (filters: FilterState) => void;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  showRowActions?: boolean;
  onEdit?: (row: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onRowClick?: (row: Record<string, unknown>) => void;
  customRowActions?: (row: Record<string, unknown>) => React.ReactNode;
  bulkActions?: React.ReactNode;
  onBulkDelete?: (selectedIds: string[]) => void;
  headerActions?: React.ReactNode | undefined;
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  sortable?: boolean;
  defaultSort?: SortState;
  onSortChange?: (sort: SortState) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  showSaveButton?: boolean;
  handleSaveSenderAccounts?: () => void;
  showHeader?: boolean;
}

export function DataTable({
  columns,
  data,
  title,
  showCount = true,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys = [],
  onSearch,
  filterable = false,
  onFilterChange,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  showRowActions = false,
  onEdit,
  onDelete,
  onRowClick,
  customRowActions,
  bulkActions,
  onBulkDelete,
  headerActions,
  paginated = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  totalItems,
  currentPage: controlledCurrentPage,
  onPageChange,
  onPageSizeChange,
  sortable = false,
  defaultSort,
  onSortChange,
  emptyTitle = "No data found",
  emptyMessage = "There are no items to display.",
  emptyIcon,
  showSaveButton = false,
  handleSaveSenderAccounts = () => {},
  showHeader = true,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({});
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [internalPageSize, setInternalPageSize] = useState(initialPageSize);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [sortState, setSortState] = useState<SortState | undefined>(
    defaultSort
  );

  const filterRef = useRef<HTMLDivElement>(null);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const pageSize = initialPageSize || internalPageSize;
  const currentPage = controlledCurrentPage ?? internalCurrentPage;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const processedData = useMemo(() => {
    let result = [...data];

    if (searchQuery && searchKeys.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) =>
        searchKeys.some((key) => {
          const value = (row as Record<string, unknown>)[key];
          return value?.toString().toLowerCase().includes(query);
        })
      );
    }

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((row) => {
          const value = (row as Record<string, unknown>)[key];
          return values.includes(value?.toString() || "");
        });
      }
    });

    if (sortState) {
      result.sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[sortState.key];
        const bValue = (b as Record<string, unknown>)[sortState.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        let comparison = 0;
        if (typeof aValue === "string" && typeof bValue === "string") {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortState.direction === "desc" ? -comparison : comparison;
      });
    }

    return result;
  }, [data, searchQuery, searchKeys, filters, sortState]);

  const paginatedData = useMemo(() => {
    if (!paginated) return processedData;
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, paginated, currentPage, pageSize]);

  const totalCount = totalItems ?? processedData.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const allSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row.id as string));

  const someSelected = paginatedData.some((row) =>
    selectedRows.includes(row.id as string)
  );

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;

    if (allSelected) {
      const pageIds = paginatedData.map((row) => row.id as string);
      onSelectionChange(
        selectedRows.filter((id) => !pageIds.includes(id as string))
      );
    } else {
      const pageIds = paginatedData.map((row) => row.id as string);
      const newSelected = [...new Set([...selectedRows, ...pageIds])];
      onSelectionChange(newSelected as string[]);
    }
  }, [allSelected, paginatedData, selectedRows, onSelectionChange]);

  const handleSelectRow = useCallback(
    (rowId: string) => {
      if (!onSelectionChange) return;

      if (selectedRows.includes(rowId)) {
        onSelectionChange(selectedRows.filter((id) => id !== rowId));
      } else {
        onSelectionChange([...selectedRows, rowId]);
      }
    },
    [selectedRows, onSelectionChange]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
      if (paginated) {
        onPageChange?.(1);
        setInternalCurrentPage(1);
      }
    },
    [onSearch, paginated, onPageChange]
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const current = prev[key] || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

        const newFilters = { ...prev, [key]: updated };
        onFilterChange?.(newFilters);
        return newFilters;
      });
    },
    [onFilterChange]
  );

  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;

      setSortState((prev) => {
        let newState: SortState;
        if (prev?.key === key) {
          newState = {
            key,
            direction: prev.direction === "asc" ? "desc" : "asc",
          };
        } else {
          newState = { key, direction: "asc" };
        }
        onSortChange?.(newState);
        return newState;
      });
    },
    [sortable, onSortChange]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange?.(page);
      setInternalCurrentPage(page);
    },
    [onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const size = parseInt(e.target.value);
      onPageSizeChange?.(size);
      setInternalPageSize(size);
      handlePageChange(1);
    },
    [onPageSizeChange, handlePageChange]
  );

  const getFilterOptions = useCallback(
    (column: Column) => {
      if (column.filterOptions) return column.filterOptions;

      const uniqueValues = new Set<string>();
      data.forEach((row) => {
        const value = (row as Record<string, unknown>)[column.key];
        if (value !== null && value !== undefined) {
          uniqueValues.add(String(value));
        }
      });

      return Array.from(uniqueValues).map((value) => ({ value, label: value }));
    },
    [data]
  );

  const renderCell = useCallback(
    (column: Column, row: Record<string, unknown>, index: number) => {
      const value = (row as Record<string, unknown>)[column.key];

      if (column.render) {
        return column.render(value, row, index);
      }

      if (value === null || value === undefined) {
        return <span style={{ color: "#999" }}>—</span>;
      }

      return String(value);
    },
    []
  );

  const renderPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} style={{ padding: "0 8px" }}>
            ...
          </span>
        );
      }
      return (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => handlePageChange(page as number)}
        >
          {page}
        </PageButton>
      );
    });
  };

  const filterableColumns = columns.filter((col) => col.filterable);
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  return (
    <TableContainer>
      {showHeader && <TableHeader>
        {title && (
          <TableTitle>
            {title}
            {showCount && <span> ({totalCount})</span>}
          </TableTitle>
        )}

        <TableActions>
          {searchable && (
            <SearchWrapper>
              <Search size={16} />
              <SearchInput
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchWrapper>
          )}

          {filterable && filterableColumns.length > 0 && (
            <FilterWrapper ref={filterRef}>
              <IconButton
                $active={hasActiveFilters}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Filter size={18} />
              </IconButton>

              {showFilterDropdown && (
                <FilterDropdown>
                  {filterableColumns.map((column) => (
                    <div key={column.key}>
                      <div
                        style={{
                          padding: "8px 12px",
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {column.label}
                      </div>
                      {getFilterOptions(column).map((option) => (
                        <FilterOption key={option.value}>
                          <input
                            type="checkbox"
                            checked={(filters[column.key] || []).includes(
                              option.value
                            )}
                            onChange={() =>
                              handleFilterChange(column.key, option.value)
                            }
                          />
                          <span>{option.label}</span>
                        </FilterOption>
                      ))}
                    </div>
                  ))}
                </FilterDropdown>
              )}
            </FilterWrapper>
          )}

          {headerActions}
        </TableActions>
      </TableHeader>}

      {selectable && selectedRows.length > 0 && (
        <BulkActions>
          <SelectedCount>{selectedRows.length} selected</SelectedCount>
          {onBulkDelete && (
            <DangerButton onClick={() => onBulkDelete(selectedRows)}>
              <Trash2 size={16} />
              Delete Selected
            </DangerButton>
          )}
          {bulkActions}
        </BulkActions>
      )}

      {loading ? (
        <TableWrapper>
          <Table>
            <TableHead>
              <TableHeadRow>
                {selectable && (
                  <TableHeadCell $width="50px">
                    <Checkbox type="checkbox" checked={false} disabled />
                  </TableHeadCell>
                )}
                {columns.map((column) => (
                  <TableHeadCell
                    key={column.key}
                    $width={column.width}
                    $align={column.align}
                  >
                    {column.label}
                  </TableHeadCell>
                ))}
                {showRowActions && (
                  <TableHeadCell $width="100px" $align="center">
                    Actions
                  </TableHeadCell>
                )}
              </TableHeadRow>
            </TableHead>
            <TableSkeleton
              rows={8}
              columns={columns}
              selectable={selectable}
              showRowActions={showRowActions}
            />
          </Table>
        </TableWrapper>
      ) : paginatedData.length === 0 ? (
        <EmptyState>
          {emptyIcon || <Inbox size={48} />}
          <h4>{emptyTitle}</h4>
          <p>{emptyMessage}</p>
        </EmptyState>
      ) : (
        <TableWrapper>
          <Table>
            <TableHead>
              <TableHeadRow>
                {selectable && (
                  <TableHeadCell $width="50px">
                    <Checkbox
                      type="checkbox"
                      ref={headerCheckboxRef}
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </TableHeadCell>
                )}

                {columns.map((column) => (
                  <TableHeadCell
                    key={column.key}
                    $width={column.width}
                    $align={column.align}
                    $sortable={sortable && column.sortable !== false}
                    onClick={() =>
                      column.sortable !== false && handleSort(column.key)
                    }
                  >
                    {column.label}
                    {sortable &&
                      sortState?.key === column.key &&
                      (sortState.direction === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </TableHeadCell>
                ))}

                {showRowActions && (
                  <TableHeadCell $width="100px" $align="center">
                    Actions
                  </TableHeadCell>
                )}
              </TableHeadRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={row.id as string}
                  $selected={selectedRows.includes(row.id as string)}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {selectable && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        type="checkbox"
                        checked={selectedRows.includes(row.id as string)}
                        onChange={() => handleSelectRow(row.id as string)}
                      />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <TableCell key={column.key} $align={column.align}>
                      {renderCell(column, row, rowIndex)}
                    </TableCell>
                  ))}

                  {showRowActions && (
                    <TableCell
                      $align="center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions>
                        {customRowActions?.(row)}
                        {onEdit && (
                          <RowActionButton
                            onClick={() => onEdit(row)}
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </RowActionButton>
                        )}
                        {onDelete && (
                          <RowActionButton
                            $danger
                            onClick={() => onDelete(row)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </RowActionButton>
                        )}
                      </RowActions>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      )}

      {paginated && totalPages > 0 && (
        <Pagination>
          <PaginationInfo>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
            entries
          </PaginationInfo>

          <PaginationControls>
            <RowsPerPage>
              <span>Rows per page:</span>
              <select value={pageSize} onChange={handlePageSizeChange}>
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </RowsPerPage>

            <PageButton
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft size={16} />
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </PageButton>

            {renderPaginationNumbers()}

            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </PageButton>
            <PageButton
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight size={16} />
            </PageButton>
          </PaginationControls>
          {showSaveButton && (
            <Button onClick={handleSaveSenderAccounts} disabled={selectedRows.length === 0}>Save</Button>
          )}
        </Pagination>
      )}
    </TableContainer>
  );
}

export { Badge };
export default DataTable;
