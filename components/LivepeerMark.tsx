import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LivepeerMarkProps {
  className?: string;
}

export function LivepeerMark({ className }: LivepeerMarkProps) {
  return (
    <a
      href="https://livepeer.org"
      target="_blank"
      rel="noreferrer"
      className={cn(
        'ml-1 mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground/80 transition hover:text-foreground',
        className,
      )}
    >
      <Image
        src="/logos/livepeer-logo-symbol-light.svg"
        alt="Livepeer"
        width={16}
        height={16}
        priority
        className="block opacity-80"
      />
      <span className="relative top-[0.5px] inline-flex h-[16px] items-center leading-none">
        Livepeer
      </span>
    </a>
  );
}
