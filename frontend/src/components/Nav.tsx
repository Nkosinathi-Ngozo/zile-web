import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import { Sheet, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";

export default function Nav({ c }: { c: SiteContent }) {
  const location = useLocation();
  const aboutHref = location.pathname === "/" ? "#about" : "/#about";
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/portfolio", label: c.navPortfolio },
    { to: "/posters", label: c.navPosters },
    { to: "/pricing", label: c.navPricing },
    { to: aboutHref, label: c.navAbout },
    { to: "/admin", label: c.navAdmin },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-baseline mix-blend-difference text-white">
      <Link to="/" className="font-mono text-[10px] tracking-widest uppercase">
        {c.brand}
      </Link>

      {/* Desktop links */}
      <div className="hidden sm:flex gap-8 font-mono text-[10px] tracking-widest uppercase">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="hover:text-accent transition-colors">
            {l.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="sm:hidden -my-2 -mr-2 p-2"
      >
        <Menu className="size-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="mix-blend-normal w-2/3">
          <SheetTitle className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            {c.brand}
          </SheetTitle>
          <div className="mt-8 flex flex-col gap-6 font-mono text-sm tracking-widest uppercase">
            {links.map((l) => (
              <SheetClose asChild key={l.label}>
                <Link to={l.to} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
