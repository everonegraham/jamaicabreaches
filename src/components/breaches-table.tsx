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
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ArrowUpDown, ChevronLeft, ChevronRight, Link2 } from "lucide-react"
import { type Breach } from "@/types/breach"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const columns: ColumnDef<Breach>[] = [
  {
    accessorKey: "target",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const sources = row.original.source
      if (!sources || Object.keys(sources).length === 0) return null
      
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted hover:text-primary border-primary/20 dark:border-primary/30 dark:hover:bg-white/10"
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px] p-2 dark:bg-secondary/95">
            <div className="space-y-2">
              {Object.entries(sources).map(([name, url]) => (
                url && (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary group px-2 py-1.5 rounded-md hover:bg-muted/50 dark:hover:bg-white/10"
                  >
                    <Link2 className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                    <span className="group-hover:underline">{name}</span>
                  </a>
                )
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
]

interface DataTableProps {
  data: Breach[]
}

export function BreachesTable({ data }: DataTableProps) {
  const [mounted, setMounted] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    setSorting([{ id: "year", desc: true }])
    setMounted(true)
  }, [])

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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Return a loading state or null during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  // Return null while client-side initialization is happening
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Filter targets..."
          value={(table.getColumn("target")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("target")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm focus-visible:ring-primary/20 dark:focus-visible:ring-primary/30 focus-visible:ring-offset-0"
        />
        <div className="text-sm font-medium text-muted-foreground dark:text-gray-300">
          Showing {table.getRowModel().rows.length} of {data.length} breaches
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="p-4 rounded-lg border bg-background">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="font-medium">{String(row.getValue("target"))}</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <div>{String(row.getValue("year"))}</div>
                  <div>•</div>
                  <div>{String(row.getValue("type"))}</div>
                </div>
              </div>
              {row.original.source && Object.keys(row.original.source).length > 0 && (
                <div className="flex-shrink-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted hover:text-primary border-primary/20 dark:border-primary/30 dark:hover:bg-white/10"
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[200px] p-2 dark:bg-secondary/95">
                      <div className="space-y-2">
                        {Object.entries(row.original.source).map(([name, url]) => (
                          url && (
                            <a
                              key={url}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm hover:text-primary group px-2 py-1.5 rounded-md hover:bg-muted/50 dark:hover:bg-white/10"
                            >
                              <Link2 className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                              <span className="group-hover:underline">{name}</span>
                            </a>
                          )
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block rounded-md border bg-background">
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground dark:text-gray-300 order-2 sm:order-1">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-muted-foreground hover:bg-primary hover:text-primary-foreground dark:border-muted/40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-2">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-muted-foreground hover:bg-primary hover:text-primary-foreground dark:border-muted/40"
          >
            <span className="mr-2">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 