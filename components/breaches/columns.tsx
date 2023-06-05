"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Icons } from "../icons"

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
      header: "Target",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "type",
      header: "Type",
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