import { useEffect, useState } from "react";
import { loadSiteContent, defaultContent, type SiteContent } from "@/lib/site-content";
import { useThemeStyles } from "@/lib/use-theme-styles";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Portfolio() {
  const [c, setC] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setC(loadSiteContent());
  }, []);

  const style = useThemeStyles(c);

  useEffect(() => {
    document.title = "Makeup Portfolio";
  }, []);

  const featured = c.gallery.filter((g) => g.featured);

  return (
    <div
      style={style}
      className="min-h-screen bg-background text-foreground font-body selection:bg-accent selection:text-white"
    >
      <Nav c={c} />

      <main className="pt-24">
        <section className="px-6 mb-16">
          <h1 className="text-[14vw] leading-[0.85] font-display uppercase tracking-tight animate-reveal">
            {c.portfolioHeading}
          </h1>
        </section>

        {featured.length > 0 && (
          <section className="px-6 sm:px-16 mb-32">
            <Carousel opts={{ loop: true }} className="mb-4">
              <CarouselContent>
                {featured.map((g, i) => (
                  <CarouselItem key={i} className="md:basis-2/3 lg:basis-1/2">
                    <div
                      className="aspect-[3/4] bg-neutral-200 outline outline-1 -outline-offset-1 outline-black/5 overflow-hidden flex items-center justify-center"
                      style={
                        g.image
                          ? {
                              backgroundImage: `url(${g.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : undefined
                      }
                    >
                      {!g.image && (
                        <span className="font-display text-3xl uppercase opacity-30 text-center px-4">
                          {g.caption}
                        </span>
                      )}
                    </div>
                    {g.caption && (
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest">
                        {g.caption}
                      </p>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:-left-12" />
              <CarouselNext className="right-2 sm:-right-12" />
            </Carousel>
          </section>
        )}

        {/* FULL GRID */}
        <section className="px-6 mb-48">
          <div className="flex justify-between items-baseline mb-12 border-b border-foreground pb-4">
            <h3 className="font-display text-3xl uppercase">All Work</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Archive
            </span>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {c.gallery.map((item, i) => {
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
                      <span className="font-display text-4xl uppercase opacity-30 text-center px-4">
                        {item.caption}
                      </span>
                    )}
                  </div>
                  {item.caption && (
                    <div className="flex justify-between mt-3 font-mono text-[10px] uppercase">
                      <span>{item.caption}</span>
                      {item.featured && <span className="text-accent">Featured</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer c={c} />
    </div>
  );
}
