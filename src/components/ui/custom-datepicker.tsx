"use client"

import * as React from "react"
import { format, getMonth, getYear, setMonth, setYear, isWithinInterval, subYears, addYears } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  onSelect,
  placeholder = "Pick a date",
  defaultValue,
  minDate = subYears(new Date(), 150), // 150 years in the past
  maxDate = addYears(new Date(), 100)  // 100 years in the future
}: Readonly<DatePickerProps>) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = React.useMemo(() => 
    Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    ),
    [startYear, endYear]
  );

  const handleMonthChange = (month: string) => {
    if (date) {
      const newDate = setMonth(date, months.indexOf(month));
      setDate(newDate);
    }
  }

  const handleYearChange = (year: string) => {
    if (date) {
      const newDate = setYear(date, parseInt(year));
      setDate(newDate);
    }
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Validate date is within allowed range
      if (!isWithinInterval(selectedDate, { start: minDate, end: maxDate })) {
        console.warn('Selected date is outside allowed range');
        return;
      }
    }
    
    setDate(selectedDate);
    onSelect?.(selectedDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "rounded-lg h-12 w-full justify-between flex text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={date ? months[getMonth(date)] : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={date ? getYear(date).toString() : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
          fromDate={minDate}
          toDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  )
}