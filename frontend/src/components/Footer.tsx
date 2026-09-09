import { Link } from "react-router-dom";
import type { SiteContent } from "@/lib/site-content";

export default function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="p-6 pt-24 flex flex-col lg:flex-row justify-between gap-12 border-t border-foreground">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-4 text-muted-foreground">
          {c.contactHeading}
        </p>
        <a
          href={`mailto:${c.email}`}
          className="font-display text-[12vw] lg:text-[10vw] leading-none uppercase block break-all hover:text-accent transition-colors"
        >
          {c.email}
        </a>
      </div>
      <div className="flex flex-col justify-end font-mono text-xs gap-2 lg:text-right">
        <a
          href={c.instagram}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent underline underline-offset-4"
        >
          Instagram
        </a>
        <a
          href={c.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-accent underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a href={`mailto:${c.email}`} className="hover:text-accent underline underline-offset-4">
          Email
        </a>
        <Link to="/admin" className="opacity-40 hover:opacity-100 hover:text-accent mt-4">
          /admin
        </Link>
      </div>
    </footer>
  );
}
