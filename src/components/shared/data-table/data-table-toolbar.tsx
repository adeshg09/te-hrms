"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Search, X } from "lucide-react"
import { DataTableToolbarProps } from "@/types/data-table"
import { DataTableViewOptions } from "./data-table-view-options"

export function DataTableToolbar<TData>({
  table,
  filter,
  setFilter,
}: DataTableToolbarProps<Table<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0 || filter !== ""

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="pl-8"
          />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setFilter("")
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}