import { RefObject } from 'react';

import { ChevronDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FilterToolbarProps {
  selectedCategories: string[];
  categoryOptions: string[];
  categoryOpen: boolean;
  categoryRef: RefObject<HTMLDivElement>;
  search: string;
  onClearAll: () => void;
  onToggleDropdown: () => void;
  onToggleCategory: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function FilterToolbar({
  selectedCategories,
  categoryOptions,
  categoryOpen,
  categoryRef,
  search,
  onClearAll,
  onToggleDropdown,
  onToggleCategory,
  onSearchChange,
}: FilterToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          key="all"
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className={cn(
            'h-8 rounded-full border-border/60 bg-card text-xs text-foreground',
            selectedCategories.length === 0
              ? 'border-primary/40 bg-primary text-primary-foreground'
              : 'hover:border-primary/30 hover:bg-secondary',
          )}
        >
          All
        </Button>

        <div className="relative z-20" ref={categoryRef}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-border/60 bg-card px-4 text-xs"
            onClick={onToggleDropdown}
          >
            <span>
              Category{selectedCategories.length ? ` · ${selectedCategories.length}` : ''}
            </span>
            <ChevronDown
              className={cn(
                'ml-2 h-3 w-3 transition-transform',
                categoryOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
          {categoryOpen ? (
            <div className="absolute z-10 mt-2 w-44 rounded-lg border border-border/60 bg-card/90 p-2 shadow-card backdrop-blur">
              {categoryOptions.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-white/5"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-primary"
                    checked={selectedCategories.includes(item)}
                    onChange={() => onToggleCategory(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
              <button
                className="mt-1 w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground"
                onClick={onClearAll}
              >
                Clear categories
              </button>
            </div>
          ) : null}
        </div>

        {selectedCategories.length > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
            onClick={onClearAll}
          >
            Clear all
          </Button>
        ) : null}
      </div>
      <div className="relative w-full md:ml-auto md:max-w-xs">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          <Search className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search apps"
          aria-label="Search apps"
          className="h-8 rounded-full border border-border/60 bg-white/5 pl-9 text-sm focus-visible:border-primary/60 focus-visible:ring-1 focus-visible:ring-primary/60"
        />
      </div>
    </div>
  );
}
