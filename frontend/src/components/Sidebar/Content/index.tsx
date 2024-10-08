import { withErrorBoundary } from "@sentry/react";
import { Content as SidebarContent } from "./component";
import { ErrorBoundary } from "./ErrorBoundary";

export const Content = withErrorBoundary(SidebarContent, {
  fallback: ErrorBoundary,
});
