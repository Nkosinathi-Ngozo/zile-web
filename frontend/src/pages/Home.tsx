import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadSiteContent, defaultContent, type SiteContent } from "@/lib/site-content";
import { useThemeStyles } from "@/lib/use-theme-styles";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  const [c, setC] = useState<SiteContent>(defaultContent);
  const location = useLocation();

  useEffect(() => {
    setC(loadSiteContent());
  }, []);

  const style = useThemeStyles(c);

  useEffect(() => {
    document.title = "Portfolio — Super-Creative in Fashion Media";
  }, []);

  // Scroll to the in-page anchor when arriving via /#about from another route.
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }
  }, [location.hash]);

  const featuredWork = c.gallery.filter((g) => g.featured).slice(0, 3);
  const workToShow = featuredWork.length > 0 ? featuredWork : c.gallery.slice(0, 3);

  return (
    <div
      style={style}
      className="min-h-screen bg-background text-foreground font-body selection:bg-accent selection:text-white"
    >
      <Nav c={c} />

      <main className="pt-24">
        {/* HERO */}
        <section className="px-6 mb-32">
          <div className="relative">
            <h1 className="text-[22vw] leading-[0.85] font-display uppercase tracking-tight animate-reveal">
              {c.heroLineOne}
              <br />
              {c.heroLineTwo}
            </h1>
            <div className="absolute top-0 right-0 w-1/3 hidden lg:block animate-reveal [animation-delay:200ms]">
              <div className="border-l border-foreground pl-4 mt-8">
                <p className="font-mono text-[11px] leading-relaxed uppercase tracking-tight">
                  {c.heroTagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section
          id="about"
          className="px-6 mb-48 flex flex-col lg:flex-row gap-12 items-end animate-reveal"
        >
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-7xl font-display uppercase mb-8 leading-none">
              {c.manifestoHeading}
              <br />
              <span style={{ color: c.colorAccent }}>{c.manifestoAccent}</span>
            </h2>
          </div>
          <div className="lg:w-1/3 pb-2">
            <p className="text-xl font-body leading-tight text-pretty">{c.manifestoBody}</p>
          </div>
        </section>

        {/* WORK (teaser) */}
        <section id="work" className="px-6 mb-48">
          <div className="flex justify-between items-baseline mb-12 border-b border-foreground pb-4">
            <h3 className="font-display text-3xl uppercase">{c.workHeading}</h3>
            <Link
              to="/portfolio"
              className="font-mono text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {workToShow.map((item, i) => {
              const spans = [
                "col-span-12 lg:col-span-7",
                "col-span-12 lg:col-span-5 lg:mt-32",
                "col-span-12 lg:col-span-8 lg:col-start-3",
              ];
              const ratios = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[16/10]"];
              return (
                <div key={i} className={`${spans[i % 3]} group animate-reveal`}>
                  <div
                    className={`w-full ${ratios[i % 3]} bg-neutral-200 outline outline-1 -outline-offset-1 outline-black/5 flex items-center justify-center overflow-hidden`}
                    style={
                      item.image
                        ? {
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    {!item.image && (
                      <span className="font-display text-4xl uppercase opacity-30">
                        {item.caption}
                      </span>
                    )}
                  </div>
                  {item.caption && (
                    <div className="flex justify-between mt-3 font-mono text-[10px] uppercase">
                      <span>{item.caption}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="px-6 py-24 border-t border-foreground">
          <div className="flex flex-col gap-1">
            {c.experience.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline gap-6 py-8 border-b border-border hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="font-mono text-xs whitespace-nowrap">{e.period}</span>
                <h3 className="text-3xl lg:text-7xl font-display uppercase text-center flex-1">
                  {e.role}
                </h3>
                <span className="hidden lg:block font-mono text-xs whitespace-nowrap max-w-[20ch] text-right">
                  {e.org}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="px-6 py-24 bg-foreground text-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest mb-6 block opacity-60">
                {c.skillsCoreLabel}
              </span>
              <ul className="divide-y divide-white/10">
                {c.skillsCore.map((s, i) => (
                  <li key={i} className="flex justify-between items-baseline py-4">
                    <span className="font-display text-2xl lg:text-4xl uppercase">{s.label}</span>
                    <span className="font-mono text-xs opacity-60">{s.years}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest mb-6 block opacity-60">
                {c.skillsSoftLabel}
              </span>
              <ul className="divide-y divide-white/10">
                {c.skillsSoft.map((s, i) => (
                  <li key={i} className="flex justify-between items-baseline py-4">
                    <span className="font-display text-2xl lg:text-4xl uppercase">{s.label}</span>
                    <span className="font-mono text-xs opacity-60">{s.years}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="px-6 py-24 border-t border-foreground">
          <h3 className="font-display text-3xl uppercase mb-12">{c.educationHeading}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {c.education.map((e, i) => (
              <div key={i} className="border-l-2 border-foreground pl-6 py-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  {e.years}
                </div>
                <div className="font-display text-2xl uppercase leading-tight">{e.school}</div>
                <div className="mt-2 text-sm">{e.degree}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-foreground py-6">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex shrink-0">
                {c.skillsCore.concat(c.skillsSoft).map((s, i) => (
                  <span key={i} className="font-display text-5xl uppercase mx-10">
                    {s.label} <span style={{ color: c.colorAccent }}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA STRIP */}
        <div className="px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 border-b border-foreground font-mono text-[10px] uppercase tracking-widest">
          <Link to="/pricing" className="hover:text-accent underline underline-offset-4">
            See pricing →
          </Link>
          <Link to="/posters" className="hover:text-accent underline underline-offset-4">
            Recent posters →
          </Link>
        </div>
      </main>

      <Footer c={c} />
    </div>
  );
}
