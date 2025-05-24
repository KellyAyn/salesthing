"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { cn } from "~/lib/utils";

const statusOptions = [
    { label: "Trash", value: "trash" },
    { label: "Pipedrive", value: "pipedrive" },
    { label: "Prospect", value: "prospect" },
];

// test

export function DropdownTable({ status }: { status: string }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(status);

    return (
        <div className="flex justify-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="p-2 justify-center w-[140px]"
                        >
                        {value
                            ? statusOptions.find((option) => option.value === value)?.label
                            : "Prospect"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-1 w-fit">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {statusOptions.map((option) => (
                                    <CommandItem
                                    className="flex justify-between"
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => {
                                        setValue(option.value)
                                        setOpen(false)
                                    }}
                                    >
                                        {option.label}
                                        <Check 
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                         </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
