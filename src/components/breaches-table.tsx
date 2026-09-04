"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { type Breach } from "@/types/breach"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SourceLinks } from "@/components/source-links"

const ALL = "all"

/** Exact match on the stringified cell value; `all` disables the filter. */
const matchesExactly: FilterFn<Breach> = (row, columnId, filterValue) =>
  filterValue === ALL || String(row.getValue(columnId)) === filterValue

const columns: ColumnDef<Breach>[] = [
  {
    accessorKey: "target",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2.5"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Target
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
  },
  {
    accessorKey: "year",
    filterFn: matchesExactly,
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2.5"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Year
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    filterFn: matchesExactly,
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2.5"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    enableSorting: false,
    cell: ({ row }) => <SourceLinks sources={row.original.source} />,
  },
]

interface DataTableProps {
  data: Breach[]
}

export function BreachesTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "year", desc: true },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const typeOptions = useMemo(
    () => [
      { label: "All types", value: ALL },
      ...Array.from(new Set(data.map((breach) => breach.type)))
        .sort((a, b) => a.localeCompare(b))
        .map((type) => ({ label: type, value: type })),
    ],
    [data]
  )

  const yearOptions = useMemo(
    () => [
      { label: "All years", value: ALL },
      ...Array.from(new Set(data.map((breach) => breach.year)))
        .sort((a, b) => b - a)
        .map((year) => ({ label: String(year), value: String(year) })),
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  const filteredCount = table.getFilteredRowModel().rows.length

  /** Reset to the first page whenever a filter narrows the result set. */
  const setFilter = (columnId: string, value: string) => {
    table.getColumn(columnId)?.setFilterValue(value)
    table.setPageIndex(0)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            placeholder="Filter targets..."
            value={(table.getColumn("target")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilter("target", event.target.value)
            }
            className="w-full sm:w-64"
          />
          <div className="flex gap-2">
            <Select
              items={typeOptions}
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ALL
              }
              onValueChange={(value) => setFilter("type", value as string)}
            >
              <SelectTrigger aria-label="Filter by type" className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              items={yearOptions}
              value={
                (table.getColumn("year")?.getFilterValue() as string) ?? ALL
              }
              onValueChange={(value) => setFilter("year", value as string)}
            >
              <SelectTrigger aria-label="Filter by year" className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {yearOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Showing {filteredCount} of {data.length} breaches
        </div>
      </div>

      {/* Mobile card view. */}
      <div className="flex flex-col gap-3 sm:hidden">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.id} className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium">
                    {String(row.getValue("target"))}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <div>{String(row.getValue("year"))}</div>
                    <div>•</div>
                    <div>{String(row.getValue("type"))}</div>
                  </div>
                </div>
                <div className="shrink-0">
                  <SourceLinks sources={row.original.source} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border bg-background p-4 text-center text-sm text-muted-foreground">
            No results.
          </div>
        )}
      </div>

      {/* Desktop table view. */}
      <div className="hidden rounded-md border bg-background sm:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="order-2 text-sm text-muted-foreground sm:order-1">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)}
        </div>
        <div className="order-1 flex items-center gap-2 sm:order-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft data-icon="inline-start" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </div>
  )
}
