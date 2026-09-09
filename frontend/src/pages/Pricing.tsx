import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { loadSiteContent, defaultContent, type SiteContent } from "@/lib/site-content";
import { useThemeStyles } from "@/lib/use-theme-styles";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [c, setC] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setC(loadSiteContent());
  }, []);

  const style = useThemeStyles(c);

  useEffect(() => {
    document.title = "Pricing";
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
            {c.pricingHeading}
          </h1>
          {c.pricingSubheading && (
            <p className="mt-6 text-xl font-body max-w-xl text-pretty">{c.pricingSubheading}</p>
          )}
        </section>

        <section className="px-6 mb-48">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {c.pricingTiers.map((tier, i) => (
              <Card
                key={i}
                className={
                  tier.highlighted
                    ? "border-accent border-2 md:-translate-y-4 shadow-lg relative bg-card"
                    : "relative bg-card"
                }
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white border-transparent">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="font-display uppercase text-2xl tracking-tight">
                    {tier.name}
                  </CardTitle>
                  <CardDescription>
                    <span className="font-display text-4xl text-foreground">{tier.price}</span>
                    {tier.period && (
                      <span className="ml-2 font-mono text-xs uppercase tracking-widest">
                        {tier.period}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="size-4 mt-0.5 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <a
                      href={`mailto:${c.email}?subject=${encodeURIComponent(
                        tier.name + " package enquiry",
                      )}`}
                    >
                      Book this package
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer c={c} />
    </div>
  );
}
