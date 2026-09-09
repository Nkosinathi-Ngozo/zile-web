import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[18vw] leading-none uppercase">404</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          This page is not in the archive.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-accent"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
