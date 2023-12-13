import * as React from "react";

import { cn } from "../../lib/utils/utils";

const Table = ({ className, ...props }) => {
  return (
    <div className="w-full relative flex overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}
Table.displayName = "Table"

const TableHeader = ({ className, ...props }) => {
  return (
    <thead className={cn("[&_tr]:border-b", className)} {...props} />
  )
}
TableHeader.displayName = "TableHeader"

const TableBody = ({ className, ...props }) => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}
TableBody.displayName = "TableBody"

const TableFooter = ({ className, ...props }) => {
  return (
    <tfoot
      className={cn("bg-primary font-medium text-primary-foreground", className)}
      {...props}
    />
  )
}
TableFooter.displayName = "TableFooter"

const TableRow = ({ className, ...props }) => {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}
TableRow.displayName = "TableRow"

const TableHead = ({ className, ...props }) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle bg-muted/50  font-medium text-primary/80 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}
TableHead.displayName = "TableHead"

const TableCell = ({ className, ...props }) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}
TableCell.displayName = "TableCell"

const TableCaption = ({ className, ...props }) => {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}