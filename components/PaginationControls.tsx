import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationControls({ page, totalPages, onPrev, onNext }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full px-3"
          disabled={page === 1}
          onClick={onPrev}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full px-3"
          disabled={page === totalPages}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
