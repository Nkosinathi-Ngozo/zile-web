import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  loadSiteContent,
  saveSiteContent,
  defaultContent,
  type SiteContent,
} from "@/lib/site-content";
import { toast } from "sonner";

const FONT_OPTIONS = [
  "Anton",
  "Bebas Neue",
  "Playfair Display",
  "Cormorant Garamond",
  "Instrument Serif",
  "Inter",
  "JetBrains Mono",
];

// UI-only editor: edits are kept in this browser's localStorage. There is no
// backend, so there's nothing to publish beyond this device.
export default function AdminPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SiteContent>(defaultContent);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<
    "content" | "gallery" | "posters" | "pricing" | "experience" | "skills" | "theme"
  >("content");

  useEffect(() => {
    document.title = "Admin — Content Editor";
    setDraft(loadSiteContent());
  }, []);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function save() {
    setSaving(true);
    try {
      saveSiteContent(draft);
      toast.success("Saved to this browser.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function signOut() {
    navigate("/auth", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur border-b border-foreground">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-widest hover:text-accent"
          >
            ← View site
          </Link>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Admin / Live Editor
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="bg-foreground text-background px-5 py-2 font-mono text-[10px] uppercase tracking-widest disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish changes"}
          </button>
          <button
            onClick={signOut}
            className="border border-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <nav className="flex gap-6 px-6 py-4 border-b border-border font-mono text-[10px] uppercase tracking-widest">
        {(
          ["content", "gallery", "posters", "pricing", "experience", "skills", "theme"] as const
        ).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              tab === t
                ? "underline underline-offset-4"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {tab === "content" && (
          <Section title="Hero & About">
            <Field label="Brand / Nav title" v={draft.brand} on={(v) => update("brand", v)} />
            <Row>
              <Field
                label="Nav — Portfolio label"
                v={draft.navPortfolio}
                on={(v) => update("navPortfolio", v)}
              />
              <Field
                label="Nav — Posters label"
                v={draft.navPosters}
                on={(v) => update("navPosters", v)}
              />
            </Row>
            <Row>
              <Field
                label="Nav — Pricing label"
                v={draft.navPricing}
                on={(v) => update("navPricing", v)}
              />
              <Field
                label="Nav — About label"
                v={draft.navAbout}
                on={(v) => update("navAbout", v)}
              />
            </Row>
            <Row>
              <Field
                label="Hero line 1"
                v={draft.heroLineOne}
                on={(v) => update("heroLineOne", v)}
              />
              <Field
                label="Hero line 2"
                v={draft.heroLineTwo}
                on={(v) => update("heroLineTwo", v)}
              />
            </Row>
            <TextArea
              label="Hero tagline"
              v={draft.heroTagline}
              on={(v) => update("heroTagline", v)}
            />
            <Row>
              <Field
                label="Manifesto heading"
                v={draft.manifestoHeading}
                on={(v) => update("manifestoHeading", v)}
              />
              <Field
                label="Accent word"
                v={draft.manifestoAccent}
                on={(v) => update("manifestoAccent", v)}
              />
            </Row>
            <TextArea
              label="Manifesto body"
              v={draft.manifestoBody}
              on={(v) => update("manifestoBody", v)}
            />
            <Row>
              <Field label="Email" v={draft.email} on={(v) => update("email", v)} />
              <Field label="Instagram URL" v={draft.instagram} on={(v) => update("instagram", v)} />
            </Row>
            <Field label="LinkedIn URL" v={draft.linkedin} on={(v) => update("linkedin", v)} />
          </Section>
        )}

        {tab === "gallery" && (
          <Section title="Makeup Portfolio">
            <Row>
              <Field
                label="Home 'Work' section heading"
                v={draft.workHeading}
                on={(v) => update("workHeading", v)}
              />
              <Field
                label="Portfolio page heading"
                v={draft.portfolioHeading}
                on={(v) => update("portfolioHeading", v)}
              />
            </Row>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Mark an image "Featured" to include it in the homepage teaser and the portfolio page's
              carousel.
            </p>
            <ListEditor
              items={draft.gallery}
              onChange={(items) => update("gallery", items)}
              blank={{ image: "", caption: "", featured: false }}
              render={(item, set) => (
                <>
                  <Field label="Image URL" v={item.image} on={(v) => set({ ...item, image: v })} />
                  <Field
                    label="Caption (optional)"
                    v={item.caption ?? ""}
                    on={(v) => set({ ...item, caption: v })}
                  />
                  <CheckboxField
                    label="Featured (show in carousel)"
                    v={item.featured ?? false}
                    on={(v) => set({ ...item, featured: v })}
                  />
                </>
              )}
              label={(i) => i.caption || "New image"}
            />
          </Section>
        )}

        {tab === "posters" && (
          <Section title="Posters">
            <Field
              label="Posters page heading"
              v={draft.postersHeading}
              on={(v) => update("postersHeading", v)}
            />
            <ListEditor
              items={draft.posters}
              onChange={(items) => update("posters", items)}
              blank={{ image: "", title: "", date: "", caption: "" }}
              render={(item, set) => (
                <>
                  <Field label="Image URL" v={item.image} on={(v) => set({ ...item, image: v })} />
                  <Row>
                    <Field
                      label="Title"
                      v={item.title ?? ""}
                      on={(v) => set({ ...item, title: v })}
                    />
                    <Field label="Date" v={item.date ?? ""} on={(v) => set({ ...item, date: v })} />
                  </Row>
                  <TextArea
                    label="Caption (optional)"
                    v={item.caption ?? ""}
                    on={(v) => set({ ...item, caption: v })}
                  />
                </>
              )}
              label={(i) => i.title || "New poster"}
            />
          </Section>
        )}

        {tab === "pricing" && (
          <Section title="Pricing">
            <Field
              label="Pricing page heading"
              v={draft.pricingHeading}
              on={(v) => update("pricingHeading", v)}
            />
            <TextArea
              label="Subheading (optional)"
              v={draft.pricingSubheading ?? ""}
              on={(v) => update("pricingSubheading", v)}
            />
            <ListEditor
              items={draft.pricingTiers}
              onChange={(items) => update("pricingTiers", items)}
              blank={{ name: "", price: "", period: "", features: [], highlighted: false }}
              render={(item, set) => (
                <>
                  <Row>
                    <Field label="Tier name" v={item.name} on={(v) => set({ ...item, name: v })} />
                    <Field label="Price" v={item.price} on={(v) => set({ ...item, price: v })} />
                  </Row>
                  <Field
                    label="Period (e.g. 'per session')"
                    v={item.period ?? ""}
                    on={(v) => set({ ...item, period: v })}
                  />
                  <TextArea
                    label="Features (one per line)"
                    v={item.features.join("\n")}
                    on={(v) => set({ ...item, features: v.split("\n").filter(Boolean) })}
                  />
                  <CheckboxField
                    label="Highlighted (Most Popular)"
                    v={item.highlighted ?? false}
                    on={(v) => set({ ...item, highlighted: v })}
                  />
                </>
              )}
              label={(i) => i.name || "New tier"}
            />
          </Section>
        )}

        {tab === "experience" && (
          <Section title="Experience">
            <ListEditor
              items={draft.experience}
              onChange={(items) => update("experience", items)}
              blank={{ period: "", role: "", org: "", detail: "" }}
              render={(item, set) => (
                <>
                  <Row>
                    <Field label="Period" v={item.period} on={(v) => set({ ...item, period: v })} />
                    <Field label="Org" v={item.org} on={(v) => set({ ...item, org: v })} />
                  </Row>
                  <Field label="Role" v={item.role} on={(v) => set({ ...item, role: v })} />
                  <TextArea
                    label="Detail"
                    v={item.detail}
                    on={(v) => set({ ...item, detail: v })}
                  />
                </>
              )}
              label={(i) => i.role || "New role"}
            />

            <h3 className="font-mono text-[10px] uppercase tracking-widest mt-12 mb-4">
              Education
            </h3>
            <ListEditor
              items={draft.education}
              onChange={(items) => update("education", items)}
              blank={{ school: "", degree: "", years: "" }}
              render={(item, set) => (
                <>
                  <Field label="School" v={item.school} on={(v) => set({ ...item, school: v })} />
                  <Row>
                    <Field label="Degree" v={item.degree} on={(v) => set({ ...item, degree: v })} />
                    <Field label="Years" v={item.years} on={(v) => set({ ...item, years: v })} />
                  </Row>
                </>
              )}
              label={(i) => i.school || "New entry"}
            />
          </Section>
        )}

        {tab === "skills" && (
          <Section title="Skills">
            <Row>
              <Field
                label="Core label"
                v={draft.skillsCoreLabel}
                on={(v) => update("skillsCoreLabel", v)}
              />
              <Field
                label="Technical label"
                v={draft.skillsSoftLabel}
                on={(v) => update("skillsSoftLabel", v)}
              />
            </Row>
            <h3 className="font-mono text-[10px] uppercase tracking-widest mt-6 mb-2">
              Core skills
            </h3>
            <ListEditor
              items={draft.skillsCore}
              onChange={(items) => update("skillsCore", items)}
              blank={{ label: "", years: "" }}
              render={(item, set) => (
                <Row>
                  <Field label="Skill" v={item.label} on={(v) => set({ ...item, label: v })} />
                  <Field label="Years" v={item.years} on={(v) => set({ ...item, years: v })} />
                </Row>
              )}
              label={(i) => i.label || "New skill"}
            />
            <h3 className="font-mono text-[10px] uppercase tracking-widest mt-8 mb-2">
              Technical skills
            </h3>
            <ListEditor
              items={draft.skillsSoft}
              onChange={(items) => update("skillsSoft", items)}
              blank={{ label: "", years: "" }}
              render={(item, set) => (
                <Row>
                  <Field label="Skill" v={item.label} on={(v) => set({ ...item, label: v })} />
                  <Field label="Years" v={item.years} on={(v) => set({ ...item, years: v })} />
                </Row>
              )}
              label={(i) => i.label || "New skill"}
            />
          </Section>
        )}

        {tab === "theme" && (
          <Section title="Colors & Typography">
            <div className="grid grid-cols-3 gap-4">
              <ColorField
                label="Background"
                v={draft.colorBackground}
                on={(v) => update("colorBackground", v)}
              />
              <ColorField
                label="Foreground"
                v={draft.colorForeground}
                on={(v) => update("colorForeground", v)}
              />
              <ColorField
                label="Accent"
                v={draft.colorAccent}
                on={(v) => update("colorAccent", v)}
              />
            </div>
            <Row>
              <SelectField
                label="Display font (headings)"
                v={draft.fontDisplay}
                opts={FONT_OPTIONS}
                on={(v) => update("fontDisplay", v)}
              />
              <SelectField
                label="Body font"
                v={draft.fontBody}
                opts={FONT_OPTIONS}
                on={(v) => update("fontBody", v)}
              />
            </Row>
            <SelectField
              label="Mono / detail font"
              v={draft.fontMono}
              opts={FONT_OPTIONS}
              on={(v) => update("fontMono", v)}
            />

            <div
              className="mt-8 p-8 border border-foreground"
              style={{
                background: draft.colorBackground,
                color: draft.colorForeground,
              }}
            >
              <span
                className="text-[9px] uppercase tracking-widest"
                style={{ fontFamily: draft.fontMono }}
              >
                Preview
              </span>
              <div
                className="text-6xl uppercase leading-none mt-3"
                style={{ fontFamily: draft.fontDisplay }}
              >
                {draft.heroLineOne}{" "}
                <span style={{ color: draft.colorAccent }}>{draft.heroLineTwo}</span>
              </div>
              <p className="mt-4 text-sm max-w-md" style={{ fontFamily: draft.fontBody }}>
                {draft.heroTagline}
              </p>
            </div>
          </Section>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-3xl uppercase">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        value={v}
        onChange={(e) => on(e.target.value)}
        className="w-full border-b border-foreground bg-transparent py-2 focus:outline-none focus:border-accent"
      />
    </label>
  );
}

function TextArea({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <textarea
        value={v}
        rows={3}
        onChange={(e) => on(e.target.value)}
        className="w-full border border-border bg-transparent p-3 focus:outline-none focus:border-foreground"
      />
    </label>
  );
}

function CheckboxField({ label, v, on }: { label: string; v: boolean; on: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
      <input type="checkbox" checked={v} onChange={(e) => on(e.target.checked)} />
      {label}
    </label>
  );
}

function ColorField({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex gap-2 items-center border border-border p-2">
        <input
          type="color"
          value={v}
          onChange={(e) => on(e.target.value)}
          className="w-10 h-10 border-0 bg-transparent cursor-pointer"
        />
        <input
          value={v}
          onChange={(e) => on(e.target.value)}
          className="flex-1 bg-transparent font-mono text-xs focus:outline-none"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  v,
  opts,
  on,
}: {
  label: string;
  v: string;
  opts: string[];
  on: (v: string) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        value={v}
        onChange={(e) => on(e.target.value)}
        className="w-full border border-border bg-background py-2 px-3"
        style={{ fontFamily: v }}
      >
        {opts.map((o) => (
          <option key={o} value={o} style={{ fontFamily: o }}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ListEditor<T>({
  items,
  onChange,
  blank,
  render,
  label,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  blank: T;
  render: (item: T, set: (next: T) => void) => React.ReactNode;
  label: (item: T) => string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="border border-border p-4" open={items.length < 4}>
          <summary className="flex justify-between items-center cursor-pointer font-mono text-xs uppercase tracking-widest">
            <span>{label(item)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange(items.filter((_, j) => j !== i));
              }}
              className="text-destructive text-[10px]"
            >
              Delete
            </button>
          </summary>
          <div className="mt-4 space-y-3">
            {render(item, (next) => onChange(items.map((it, j) => (j === i ? next : it))))}
          </div>
        </details>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { ...blank }])}
        className="w-full border border-dashed border-foreground py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
      >
        + Add
      </button>
    </div>
  );
}
