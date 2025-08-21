import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown) {
    console.error("[ErrorBoundary]", error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[50vh] grid place-items-center p-8">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-sm opacity-70 mt-2">
              Try reloading or going back to the homepage.
            </p>
            <a href="#/" className="inline-block mt-4 underline">
              Go home
            </a>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
