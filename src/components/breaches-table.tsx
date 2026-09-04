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
  Column,
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
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { type Breach } from "@/types/breach"
import { Badge } from "@/components/ui/badge"
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
import { cn } from "@/lib/utils"

interface ColumnMeta {
  headClassName?: string
  cellClassName?: string
}

const ALL = "all"

/** Gap between one row's entrance and the next. */
const ROW_STAGGER_MS = 40

/** The table block lands after the hero stack has finished arriving. */
const TABLE_ENTRANCE_MS = 420

/** Column headers repeat; the only thing that varies is the label. */
function SortableHeader({
  column,
  label,
}: {
  column: Column<Breach, unknown>
  label: string
}) {
  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-2.5 transition-colors", sorted && "text-brand")}
      aria-label={`Sort by ${label}, currently ${
        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "unsorted"
      }`}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      <Icon
        data-icon="inline-end"
        // Remounting on each change replays the fade, so the flip reads as a change.
        key={String(sorted)}
        className={cn(
          "animate-fade-in",
          sorted ? "text-brand" : "opacity-40 transition-opacity group-hover/button:opacity-70"
        )}
      />
    </Button>
  )
}

/** Exact match on the stringified cell value; `all` disables the filter. */
const matchesExactly: FilterFn<Breach> = (row, columnId, filterValue) =>
  filterValue === ALL || String(row.getValue(columnId)) === filterValue

const columns: ColumnDef<Breach>[] = [
  {
    accessorKey: "target",
    header: ({ column }) => <SortableHeader column={column} label="Target" />,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("target")}</span>
    ),
  },
  {
    accessorKey: "year",
    filterFn: matchesExactly,
    meta: { headClassName: "w-[110px]" },
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("year")}</span>
    ),
    header: ({ column }) => <SortableHeader column={column} label="Year" />,
  },
  {
    accessorKey: "type",
    filterFn: matchesExactly,
    meta: { headClassName: "w-[190px]" },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="font-normal transition-colors duration-300 group-hover/row:border-primary/40 group-hover/row:bg-primary/10 group-hover/row:text-brand"
      >
        {row.getValue("type")}
      </Badge>
    ),
    header: ({ column }) => <SortableHeader column={column} label="Type" />,
  },
  {
    accessorKey: "source",
    header: () => <span className="pr-2.5 text-right">Source</span>,
    enableSorting: false,
    meta: { headClassName: "w-[90px] text-right", cellClassName: "text-right" },
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
  const { pageIndex, pageSize } = table.getState().pagination
  const rangeStart = pageIndex * pageSize + 1
  const rangeEnd = Math.min(rangeStart + pageSize - 1, filteredCount)

  const typeFilter = (table.getColumn("type")?.getFilterValue() as string) ?? ALL
  const yearFilter = (table.getColumn("year")?.getFilterValue() as string) ?? ALL
  const sortKey = sorting.map(({ id, desc }) => `${id}:${desc}`).join(",")

  /**
   * Remounting the rows under a new key replays their cascade. Paging, sorting
   * and the dropdowns each swap the whole result set, so a cascade reads as the
   * answer changing — the text filter is left out, since it fires per keystroke.
   */
  const cascadeKey = `${pageIndex}|${typeFilter}|${yearFilter}|${sortKey}`

  const rows = table.getRowModel().rows

  /** Reset to the first page whenever a filter narrows the result set. */
  const setFilter = (columnId: string, value: string) => {
    table.getColumn(columnId)?.setFilterValue(value)
    table.setPageIndex(0)
  }

  return (
    <div
      className="animate-fade-up flex flex-col gap-6"
      style={{ animationDelay: `${TABLE_ENTRANCE_MS}ms` }}
    >
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
          Showing{" "}
          <span className="tabular-nums text-brand">{filteredCount}</span> of{" "}
          <span className="tabular-nums">{data.length}</span> breaches
        </div>
      </div>

      {/* Mobile card view. */}
      <div key={cascadeKey} className="flex flex-col gap-3 sm:hidden">
        {rows.length ? (
          rows.map((row, index) => (
            <div
              key={row.id}
              style={{ animationDelay: `${index * ROW_STAGGER_MS}ms` }}
              className="animate-fade-up rounded-lg border bg-card p-4 transition-colors duration-300 active:border-primary/40 active:bg-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium">
                    {String(row.getValue("target"))}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="tabular-nums">
                      {String(row.getValue("year"))}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-primary/25 bg-primary/5 font-normal text-brand"
                    >
                      {String(row.getValue("type"))}
                    </Badge>
                  </div>
                </div>
                <div className="shrink-0">
                  <SourceLinks sources={row.original.source} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border bg-card p-4 text-center text-sm text-muted-foreground">
            No results.
          </div>
        )}
      </div>

      {/* Desktop table view. */}
      <div className="hidden overflow-hidden rounded-lg border bg-card sm:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      (header.column.columnDef.meta as ColumnMeta | undefined)
                        ?.headClassName
                    }
                  >
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
          <TableBody key={cascadeKey}>
            {rows.length ? (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  style={{ animationDelay: `${index * ROW_STAGGER_MS}ms` }}
                  className="group/row animate-fade-in hover:bg-primary/5 dark:hover:bg-primary/8"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        (cell.column.columnDef.meta as ColumnMeta | undefined)
                          ?.cellClassName
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
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
          {filteredCount === 0
            ? "No breaches"
            : `${rangeStart} to ${rangeEnd} of ${filteredCount}`}
        </div>
        <div className="order-1 flex items-center gap-2 sm:order-2">
          <Button
            variant="outline"
            className="transition-colors hover:border-primary/40 hover:text-brand"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft
              data-icon="inline-start"
              className="transition-transform duration-200 group-hover/button:-translate-x-0.5"
            />
            Previous
          </Button>
          <Button
            variant="outline"
            className="transition-colors hover:border-primary/40 hover:text-brand"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight
              data-icon="inline-end"
              className="transition-transform duration-200 group-hover/button:translate-x-0.5"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
