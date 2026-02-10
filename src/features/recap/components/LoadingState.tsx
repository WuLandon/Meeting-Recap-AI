import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <div className="space-y-6">
      {/* Summary skeleton */}
      <Card className="p-6 shadow-elegant border-border">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </Card>

      {/* Action Items skeleton */}
      <Card className="p-6 shadow-elegant border-border">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <div className="flex gap-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </Card>

      {/* Decisions skeleton */}
      <Card className="p-6 shadow-elegant border-border">
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </Card>

      {/* Next Meeting skeleton */}
      <Card className="p-6 shadow-elegant border-border">
        <Skeleton className="h-6 w-36 mb-4" />
        <Skeleton className="h-4 w-48" />
      </Card>
    </div>
  );
};
