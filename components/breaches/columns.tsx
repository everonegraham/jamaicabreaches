"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Icons } from "../icons"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"

export type Breaches = {
  target: string
  year: number
  type: string
  records: string
  source: string
}

export const columns: ColumnDef<Breaches>[] = [
    {
      accessorKey: "target",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "records",
      header: "Records",
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        return (
          <Link href={row.getValue("source")} target="_blank" rel="noreferrer">
            <Icons.linkIcon className="h-5 w-5"/>
          </Link>
        )

      }
    },
  ]