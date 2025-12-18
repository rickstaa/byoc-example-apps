import type React from 'react';
import { Link } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppEntry } from '@/data/types';

const getHostname = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

export function AppCard({ app }: { app: AppEntry }) {
  const hostname = getHostname(app.website);
  const creator = app.creator?.trim() || 'Community';
  const primaryLink = app.website || app.repo;

  const GithubIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.9 10.96.58.1.79-.25.79-.55 0-.28-.01-1.02-.02-2-3.21.7-3.89-1.55-3.89-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.45.11-3.01 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.91-.39c.99 0 1.99.13 2.92.39 2.21-1.49 3.18-1.18 3.18-1.18.64 1.56.24 2.72.12 3.01.75.82 1.2 1.85 1.2 3.1 0 4.43-2.7 5.39-5.27 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.8.55A10.54 10.54 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );

  const handleOpen = () => {
    if (!primaryLink) return;
    window.open(primaryLink, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!primaryLink) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <Card
      className={`glass-panel flex h-full flex-col gap-5 border-border/60 p-6 transition-transform hover:-translate-y-1 hover:border-primary/40 ${
        primaryLink ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary' : ''
      }`}
      role={primaryLink ? 'link' : undefined}
      tabIndex={primaryLink ? 0 : -1}
      aria-label={
        primaryLink
          ? `Open ${app.name} ${app.website ? 'live demo' : 'repository'}`
          : undefined
      }
      onClick={primaryLink ? handleOpen : undefined}
      onKeyDown={primaryLink ? handleKeyDown : undefined}
    >
      <CardHeader className="flex flex-row items-start gap-4 p-0">
        <div className="rounded-2xl border border-border/70 bg-secondary px-3 py-3">
          <Avatar className="h-12 w-12 rounded-xl">
            <AvatarImage src={app.logo ?? ''} alt={`${app.name} logo`} className="rounded-xl" />
            <AvatarFallback className="rounded-xl text-xs">
              {app.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-foreground">{app.name}</CardTitle>
          {hostname ? <p className="text-xs text-muted-foreground">{hostname}</p> : null}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-0">
        <p className="text-sm text-muted-foreground">{app.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <Badge key={`${app.name}-${tag}`} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-3 p-0 text-sm">
        <Badge
          variant="secondary"
          className="rounded-full bg-[#1d2f25] px-3 py-1 text-xs text-[#9ad3b8] hover:bg-[#1d2f25]"
        >
          By {creator}
        </Badge>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {app.website ? (
            <a
              className="flex items-center gap-1 text-foreground hover:text-primary"
              href={app.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${app.name} live app`}
              onClick={(event) => event.stopPropagation()}
            >
              <Link className="h-4 w-4" strokeWidth={1.5} />
              <span className="sr-only">Live app</span>
            </a>
          ) : null}
          {app.repo ? (
            <a
              className="flex items-center gap-1 text-foreground hover:text-primary"
              href={app.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${app.name} GitHub repository`}
              onClick={(event) => event.stopPropagation()}
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </a>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
