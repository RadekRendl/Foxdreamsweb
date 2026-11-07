import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import marble from "@/assets/marble-bg.jpg";
import logo from "@/assets/fox-dreams-logo.png.asset.json";
import moonLamp from "@/assets/moon-lamp.jpeg.asset.json";
import treatmentBed from "@/assets/treatment-bed.jpeg.asset.json";
import woodenTools from "@/assets/wooden-tools.jpeg.asset.json";
import eberlin from "@/assets/eberlin-products.jpeg.asset.json";
import salonRoom from "@/assets/salon-room.jpeg.asset.json";
import vanity from "@/assets/mirror-vanity.jpeg.asset.json";

export const Route = createFileRoute("/varianta-2")({
  head: () => ({
    meta: [
      { title: "Fox Dreams — Mramor & zlato | Návrh B" },
      { name: "description", content: "Alternativní návrh webu salonu Fox Dreams: mramor, zlaté linky a interaktivní rituály Headspa, maderoterapie a Eberlin." },
      { property: "og:title", content: "Fox Dreams — Mramor & zlato" },
      { property: "og:description", content: "Headspa, maderoterapie a péče Eberlin v salonu, kde čas zpomaluje." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VariantB,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, on] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.1,1)] ${on ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="20" cy="20" r="17" opacity=".5" />
      <path d="M26 27a10 10 0 1 1-6-18 8 8 0 0 0 6 18Z" />
      <path d="M29 11l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" />
    </svg>
  );
}

/* Fixed golden frame on the page edges */
function GoldFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-3 z-40 md:inset-5">
      <div className="gold-line absolute inset-x-10 top-0 h-px" />
      <div className="gold-line absolute inset-x-10 bottom-0 h-px" />
      <div className="gold-line-v absolute inset-y-10 left-0 w-px" />
      <div className="gold-line-v absolute inset-y-10 right-0 w-px" />
      {["left-0 top-0", "right-0 top-0 rotate-90", "right-0 bottom-0 rotate-180", "left-0 bottom-0 -rotate-90"].map((p) => (
        <svg key={p} viewBox="0 0 40 40" className={`absolute h-10 w-10 text-gold ${p}`} fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 40V8a7 7 0 0 1 7-7h32" />
          <circle cx="8" cy="8" r="1.6" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

const rituals = [
  { n: "01", title: "Headspa", sub: "Rituál pro hlavu i mysl", text: "Diagnostika pokožky, teplá vodní terapie, masáž a péče, po které se zpomalí dech i myšlenky.", img: moonLamp.url, time: "90 min" },
  { n: "02", title: "Maderoterapie", sub: "Dřevo, rytmus, lehkost", text: "Ručně tvarované dřevěné nástroje modelují tělo a podporují přirozenou lymfatickou drenáž.", img: woodenTools.url, time: "60 min" },
  { n: "03", title: "Eberlin", sub: "Profesionální péče o pleť", text: "Ošetření s francouzskou kosmetikou Eberlin — výživa, jas a viditelně odpočatá pleť.", img: eberlin.url, time: "75 min" },
];

function VariantB() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 });
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-foreground"
      onPointerMove={(e) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}
    >
      {/* Marble background with parallax + cursor light */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <img src={marble} alt="" width={1536} height={1920} className="h-[120%] w-full object-cover" style={{ transform: `translateY(${-scrollY * 0.08}px)` }} />
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{ background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 60%)` }}
        />
        <div className="absolute inset-0 bg-ivory/30" />
      </div>
      <GoldFrame />

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-30 px-8 py-4 transition-all duration-500 md:px-14 ${scrollY > 40 ? "bg-ivory/70 backdrop-blur-md" : "pt-8"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <img src={logo.url} alt="Fox Dreams" className="h-16 w-auto md:h-20" />
          <nav className="hidden gap-10 text-[0.68rem] uppercase tracking-[0.35em] md:flex">
            <a href="#ritualy" className="hover:text-gold-deep">Rituály</a>
            <a href="#salon" className="hover:text-gold-deep">Salon</a>
            <a href="#kontakt" className="hover:text-gold-deep">Kontakt</a>
          </nav>
          <a href="#kontakt" className="rounded-full border border-gold/60 px-5 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-gold-deep backdrop-blur transition hover:bg-gold hover:text-ivory">
            Rezervace
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-8 pt-28 text-center">
        <Rise>
          <div className="relative mx-auto w-fit" style={{ animation: "float-orb 7s ease-in-out infinite" }}>
            <div className="absolute inset-0 -z-10 rounded-full bg-gold/25 blur-3xl" />
            <img src={logo.url} alt="Fox Dreams Beauty Salon" className="mx-auto w-64 md:w-96" />
          </div>
        </Rise>
        <Rise delay={250}>
          <p className="mt-10 text-[0.68rem] uppercase tracking-[0.5em] text-gold-deep">Beauty salon · Petra Lišková</p>
        </Rise>
        <Rise delay={450}>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
            Místo, kde <em className="gold-text not-italic font-serif italic">čas</em> zpomaluje
          </h1>
        </Rise>
        <Rise delay={650}>
          <a href="#ritualy" className="group mt-14 inline-flex flex-col items-center gap-3 text-[0.62rem] uppercase tracking-[0.4em] text-foreground/60">
            Objevte rituály
            <span className="relative block h-14 w-px overflow-hidden bg-gold/20">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gold" style={{ animation: "float-orb 2.4s ease-in-out infinite" }} />
            </span>
          </a>
        </Rise>
      </section>

      {/* Marquee */}
      <div className="relative border-y border-gold/30 bg-ivory/40 py-5 backdrop-blur-sm">
        <div className="flex w-max gap-12 whitespace-nowrap font-serif text-2xl italic text-gold-deep" style={{ animation: "marquee 40s linear infinite" }}>
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Headspa", "Maderoterapie", "Eberlin", "Klid", "Rituál", "Péče"].map((w) => (
              <span key={w + k} className="flex items-center gap-12">
                {w} <Crescent className="h-5 w-5 text-gold" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* Rituals — interactive switcher */}
      <section id="ritualy" className="px-8 py-28 md:px-14 md:py-40">
        <div className="mx-auto max-w-6xl">
          <Rise>
            <p className="text-[0.68rem] uppercase tracking-[0.5em] text-gold-deep">Rituály</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Tři cesty k odpočinku</h2>
          </Rise>
          <div className="mt-16 grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
            <ul>
              {rituals.map((r, i) => (
                <li key={r.n}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group w-full border-b border-gold/30 py-7 text-left"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className={`font-serif text-sm transition ${active === i ? "text-gold-deep" : "text-foreground/40"}`}>{r.n}</span>
                      <span className={`font-serif text-4xl transition-all duration-500 md:text-5xl ${active === i ? "gold-text translate-x-2" : "text-foreground/70"}`}>{r.title}</span>
                      <span className="ml-auto text-[0.6rem] uppercase tracking-[0.3em] text-foreground/50">{r.time}</span>
                    </div>
                    <div className={`grid transition-all duration-700 ${active === i ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <p className="overflow-hidden pl-12 text-sm leading-relaxed text-foreground/70">
                        <span className="mb-1 block text-[0.62rem] uppercase tracking-[0.3em] text-gold-deep">{r.sub}</span>
                        {r.text}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-gold/40 p-3">
              {rituals.map((r, i) => (
                <img
                  key={r.n}
                  src={r.img}
                  alt={r.title}
                  loading="lazy"
                  className={`absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-t-full object-cover transition-all duration-[1200ms] ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                />
              ))}
              <Crescent className="absolute bottom-6 left-1/2 h-10 w-10 -translate-x-1/2 text-ivory" />
            </div>
          </div>
        </div>
      </section>

      {/* Salon — tilt cards */}
      <section id="salon" className="px-8 py-28 md:px-14 md:py-40">
        <div className="mx-auto max-w-6xl">
          <Rise className="mx-auto max-w-2xl text-center">
            <Crescent className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-6 text-4xl md:text-6xl">Salon pod měsícem</h2>
            <p className="mt-6 leading-relaxed text-foreground/70">
              Mramor, teplé světlo a ticho. Intimní prostor, kde se o vás stará jen jedna osoba — s plnou pozorností a bez spěchu.
            </p>
          </Rise>
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              { img: salonRoom.url, t: "Prostor" },
              { img: treatmentBed.url, t: "Klid" },
              { img: vanity.url, t: "Detail" },
            ].map((c, i) => (
              <Rise key={c.t} delay={i * 150}>
                <TiltCard img={c.img} title={c.t} offset={i === 1} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="px-8 pb-36 pt-20 md:px-14">
        <Rise className="marble-card mx-auto max-w-3xl rounded-[2rem] px-8 py-16 text-center md:px-16">
          <p className="text-[0.68rem] uppercase tracking-[0.5em] text-gold-deep">Rezervace</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Dopřejte si chvíli jen pro sebe</h2>
          <div className="gold-line mx-auto my-10 h-px w-40" />
          <div className="grid gap-8 text-sm md:grid-cols-3">
            <div><p className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground/50">Telefon</p><a href="tel:+420777000000" className="mt-2 block font-serif text-xl">+420 777 000 000</a></div>
            <div><p className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground/50">Instagram</p><a href="https://instagram.com/foxdreams_beautysalon" target="_blank" rel="noreferrer" className="mt-2 block font-serif text-xl">@foxdreams</a></div>
            <div><p className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground/50">Otevřeno</p><p className="mt-2 font-serif text-xl">Po–Pá 9–19</p></div>
          </div>
          <a href="tel:+420777000000" className="mt-12 inline-block rounded-full bg-gold-deep px-10 py-4 text-[0.65rem] uppercase tracking-[0.35em] text-ivory transition hover:bg-gold">
            Rezervovat termín
          </a>
        </Rise>
        <div className="mt-20 flex flex-col items-center gap-4 text-[0.6rem] uppercase tracking-[0.35em] text-foreground/50">
          <img src={logo.url} alt="Fox Dreams" className="h-14 w-auto opacity-80" />
          <span>© 2026 Fox Dreams Beauty Salon</span>
          <Link to="/" className="text-gold-deep hover:underline">Zobrazit návrh A</Link>
        </div>
      </section>
    </div>
  );
}

function TiltCard({ img, title, offset }: { img: string; title: string; offset?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setT({ rx: (0.5 - y) * 10, ry: (x - 0.5) * 12, gx: x * 100, gy: y * 100 });
      }}
      onPointerLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 })}
      className={`group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-gold/40 transition-transform duration-300 ease-out ${offset ? "md:mt-16" : ""}`}
      style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
    >
      <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-110" />
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, color-mix(in oklab, var(--gold) 40%, transparent), transparent 55%)` }} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
        <p className="font-serif text-3xl italic text-ivory">{title}</p>
      </div>
    </div>
  );
}
