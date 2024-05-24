"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowUpDown, Link as Link_ } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Breaches = {
  target: string
  year: number
  type: string
  source:{
    [key: string]: any
  };
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
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        const source: Breaches["source"] = row.getValue("source")
        const keys = Object.keys(source) 
        return (
          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-10 rounded-full p-0">
                <Link_ className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-36">
              {keys.map((key, index) => (
                <div key={key}>
                  <DropdownMenuItem>
                    <Link_ className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    <Link href={source[key]} target="_blank" rel="noreferrer">
                      <h4 className="font-medium leading-none">
                        {key}
                      </h4>
                    </Link>
                  </DropdownMenuItem>
                  {index < keys.length - 1 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )

      }
    },
  ]