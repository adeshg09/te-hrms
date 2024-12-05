import { ColumnDef } from "@tanstack/react-table"

// Generic interface for all table data
export interface BaseTableItem {
  id: string
  status?: "active" | "inactive"
  createdAt?: string
}

// Employee specific interface
export interface Employee extends BaseTableItem {
  name: string
  email: string
  role: string
  department: string
  designation: string
  joinDate: string
}

// Role specific interface
export interface Role extends BaseTableItem {
  name: string
  description: string
  permissions: string[]
  department: string
}

// Designation specific interface
export interface Designation extends BaseTableItem {
  title: string
  level: string
  department: string
  responsibilities: string[]
}



export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
}

export interface DataTableToolbarProps<TData> {
  table: TData
  filter: string
  setFilter: (value: string) => void
}