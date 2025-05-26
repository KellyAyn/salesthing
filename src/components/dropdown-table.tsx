'use client';

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';
import { cn } from '~/lib/utils';

const statusOptions = [
  { label: 'Trash', value: 'trash' },
  { label: 'Pipedrive', value: 'pipedrive' },
  { label: 'Prospect', value: 'prospect' },
];

export function DropdownTable({
  status,
  onStatusChange,
}: {
  status: string;
  onStatusChange?: (status: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(status);

  // Update local state when prop changes
  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <div className='flex justify-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            role='combobox'
            aria-expanded={open}
            className='w-[140px] justify-center p-2'
          >
            {value
              ? statusOptions.find((option) => option.value === value)?.label
              : 'Prospect'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-1'>
          <Command>
            <CommandList>
              <CommandGroup>
                {statusOptions.map((option) => (
                  <CommandItem
                    className='flex justify-between'
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      setValue(option.value);
                      setOpen(false);
                      onStatusChange?.(option.value);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
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
