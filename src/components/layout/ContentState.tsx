import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
export function ContentState({
  loading,
  error,
  empty,
  retry,
}: {
  loading: boolean;
  error: Error | null;
  empty: boolean;
  retry: () => void;
}) {
  if (loading)
    return (
      <div
        className="content-loading"
        role="status"
        aria-label="Loading content"
      >
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-24 w-full" />
        <span className="sr-only">Loading content</span>
      </div>
    );
  if (error)
    return (
      <Alert>
        <AlertTitle>Content is temporarily unavailable.</AlertTitle>
        <AlertDescription>
          <p>Please try again to load the latest content.</p>
          <Button variant="outline" onClick={retry}>
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    );
  if (empty)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Nothing published here yet.</EmptyTitle>
          <EmptyDescription>Check back for the next update.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  return null;
}
