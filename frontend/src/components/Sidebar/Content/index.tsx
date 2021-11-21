import * as Sentry from "@sentry/react";
import { Content as SidebarContent } from "./component";
import { ErrorBoundary } from "./ErrorBoundary";

export const Content = Sentry.withErrorBoundary(SidebarContent, {
  fallback: ErrorBoundary,
});
