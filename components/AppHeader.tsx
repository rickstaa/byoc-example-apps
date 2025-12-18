import { LivepeerMark } from '@/components/LivepeerMark';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  repoUrl: string;
  contributeUrl: string;
}

export function AppHeader({ repoUrl, contributeUrl }: AppHeaderProps) {
  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pt-6 pb-1">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <LivepeerMark />
          <div className="flex flex-wrap items-baseline gap-2">
            <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Example apps
            </h1>
          </div>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Forkable example applications build on Livepeer&apos;s bring your own container
            pipeline, created by{' '}
            <a
              href="https://muxxion.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-emerald-500 underline-offset-4 hover:text-emerald-100 hover:underline"
            >
              Muxxion Labs
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end md:self-center">
          <Button variant="default" className="h-10 rounded-full px-4 text-sm" asChild>
            <a href={repoUrl} target="_blank" rel="noreferrer">
              Submit your app
            </a>
          </Button>
          <Button variant="outline" className="h-10 rounded-full px-4 text-sm" asChild>
            <a href={contributeUrl} target="_blank" rel="noreferrer">
              Contribution guide
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
