import { useEffect, useState } from "react";
import { loadSiteContent, defaultContent, type SiteContent } from "@/lib/site-content";
import { useThemeStyles } from "@/lib/use-theme-styles";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Posters() {
  const [c, setC] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setC(loadSiteContent());
  }, []);

  const style = useThemeStyles(c);

  useEffect(() => {
    document.title = "Posters";
  }, []);

  return (
    <div
      style={style}
      className="min-h-screen bg-background text-foreground font-body selection:bg-accent selection:text-white"
    >
      <Nav c={c} />

      <main className="pt-24">
        <section className="px-6 mb-16">
          <h1 className="text-[14vw] leading-[0.85] font-display uppercase tracking-tight animate-reveal">
            {c.postersHeading}
          </h1>
        </section>

        <section className="px-6 mb-48">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.posters.map((p, i) => (
              <div key={i} className="group animate-reveal">
                <div
                  className="w-full aspect-[3/4] bg-neutral-200 outline outline-1 -outline-offset-1 outline-black/5 flex items-center justify-center overflow-hidden"
                  style={
                    p.image
                      ? {
                          backgroundImage: `url(${p.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  {!p.image && (
                    <span className="font-display text-3xl uppercase opacity-30 text-center px-4">
                      {p.title}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-widest">
                    <span>{p.title}</span>
                    <span className="text-muted-foreground">{p.date}</span>
                  </div>
                  {p.caption && <p className="mt-1 text-sm text-pretty">{p.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer c={c} />
    </div>
  );
}
