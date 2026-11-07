import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import noir from "@/assets/beige-marble.jpg";
import logo from "@/assets/fox-dreams-logo.png.asset.json";
import moonLamp from "@/assets/moon-lamp.jpeg.asset.json";
import treatmentBed from "@/assets/treatment-bed.jpeg.asset.json";
import woodenTools from "@/assets/wooden-tools.jpeg.asset.json";
import eberlin from "@/assets/eberlin-products.jpeg.asset.json";
import salonRoom from "@/assets/salon-room.jpeg.asset.json";
import salonMirror from "@/assets/salon-mirror.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fox Dreams Beauty Salon — Headspa & Maderoterapie | Petra Lišková" },
      { name: "description", content: "Noční oáza klidu Fox Dreams: Headspa rituály, maderoterapie a péče Eberlin. Najděte svůj rituál a zpomalte." },
      { property: "og:title", content: "Fox Dreams — Noční oáza klidu" },
      { property: "og:description", content: "Headspa, maderoterapie a péče Eberlin v intimním salonu Petry Liškové." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoirPage,
});

const INSTAGRAM = "https://instagram.com/foxdreams_beautysalon";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

function Fade({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, on] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1300ms] ease-[cubic-bezier(.2,.7,.1,1)] ${on ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const moods = [
  {
    key: "mysl",
    feel: "Potřebuji vypnout hlavu",
    title: "Headspa rituál",
    time: "90 min",
    text: "Diagnostika pokožky, teplá vodní terapie a hluboká masáž hlavy. Napětí odchází, dech se zpomalí.",
    img: moonLamp.url,
  },
  {
    key: "telo",
    feel: "Chci lehkost v těle",
    title: "Maderoterapie",
    time: "60 min",
    text: "Ručně tvarované dřevěné nástroje modelují siluetu a podporují přirozenou lymfatickou drenáž.",
    img: woodenTools.url,
  },
  {
    key: "plet",
    feel: "Toužím po zářivé pleti",
    title: "Péče Eberlin",
    time: "75 min",
    text: "Profesionální ošetření s francouzskou kosmetikou Eberlin. Výživa, jas a odpočatý výraz.",
    img: eberlin.url,
  },
];

const steps = [
  { t: "Přivítání", d: "Čaj, ztlumené světlo a krátký rozhovor o tom, co dnes potřebujete." },
  { t: "Diagnostika", d: "Jemné posouzení pokožky hlavy a vlasů, výběr péče přímo pro vás." },
  { t: "Vodní terapie", d: "Teplá voda, aroma a rytmická masáž. Čas se tu zastaví." },
  { t: "Návrat", d: "Chvíle ticha na lůžku pod měsícem, než se vrátíte do světa." },
];

const gallery = [
  { img: moonLamp.url, cap: "Měsíc nad lůžkem" },
  { img: treatmentBed.url, cap: "Místo pro klid" },
  { img: woodenTools.url, cap: "Dřevo & rytmus" },
  { img: salonMirror.url, cap: "Zrcadlo" },
  { img: salonRoom.url, cap: "Salon" },
  { img: eberlin.url, cap: "Eberlin" },
];

function NoirPage() {
  const [mouse, setMouse] = useState({ x: 70, y: 20 });
  const [scrollY, setScrollY] = useState(0);
  const [mood, setMood] = useState(0);
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (t: number) => {
      const dt = Math.min(t - last, 50);
      last = t;
      const half = el.scrollWidth / 2;
      if (pausedRef.current) {
        pos = el.scrollLeft;
      } else {
        pos += dt * 0.04;
      }
      if (pos >= half) pos -= half;
      if (pos < 0) pos += half;
      if (Math.abs(el.scrollLeft - pos) > 0.5) el.scrollLeft = pos;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => setMouse({ x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 });
    const onScroll = () => setScrollY(scrollY0());
    const scrollY0 = () => window.scrollY;
    addEventListener("pointermove", onMove);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 4500);
    return () => clearInterval(id);
  }, []);

  const m = moods[mood]!;
  const nav = [
    ["Rituály", "#ritualy"],
    ["Průběh", "#prubeh"],
    ["Salon", "#salon"],
    ["Kontakt", "#kontakt"],
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-noir text-pearl">
      {/* Marble + spotlight */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-0">
        <img
          src={noir}
          alt=""
          width={1280}
          height={1920}
          className="h-[150%] w-full object-cover opacity-90"
          style={{ transform: `translateY(${-Math.min(scrollY * 0.04, 400)}px) scale(1.05)` }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, color-mix(in oklab, var(--rose-gold) 18%, transparent), transparent 60%), linear-gradient(to bottom, color-mix(in oklab, var(--noir) 35%, transparent), color-mix(in oklab, var(--noir) 62%, transparent))`,
          }}
        />
      </div>

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 noir-glass mx-4 md:mx-auto">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-pearl">
              <img src={logo.url} alt="Fox Dreams" className="h-9 w-9 object-contain" />
            </span>
            <span className="font-serif text-lg tracking-wide">Fox Dreams</span>
          </a>
          <nav className="hidden gap-8 text-[0.7rem] uppercase tracking-[0.3em] md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="text-pearl/70 transition hover:text-rose">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#kontakt" className="rounded-full border border-rose/50 px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-rose transition hover:bg-rose hover:text-noir">
              Rezervovat
            </a>
            <button aria-label="Menu" onClick={() => setMenu(!menu)} className="md:hidden">
              <span className={`block h-px w-6 bg-pearl transition ${menu ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`mt-1.5 block h-px w-6 bg-pearl transition ${menu ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        {menu && (
          <div className="mx-4 mt-2 rounded-3xl p-6 noir-glass md:hidden">
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block py-3 font-serif text-2xl">{l}</a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-[1.1fr_1fr]">
          <div>
            <Fade>
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-rose">Beauty salon · Petra Lišková</p>
            </Fade>
            <Fade delay={150}>
              <h1 className="mt-6 font-serif text-5xl leading-[1.02] md:text-7xl">
                Když se setmí,<br />
                <em className="rose-text">začíná klid.</em>
              </h1>
            </Fade>
            <Fade delay={300}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-pearl/70">
                Intimní salon pod svitem měsíce. Headspa rituály, maderoterapie a péče Eberlin pro chvíle, kdy potřebujete jen být.
              </p>
            </Fade>
            <Fade delay={450}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a href="#ritualy" className="group inline-flex items-center gap-3 rounded-full bg-rose px-7 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-noir transition hover:bg-pearl">
                  Najít svůj rituál
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-[0.7rem] uppercase tracking-[0.3em] text-pearl/60 underline-offset-8 hover:text-rose hover:underline">
                  Instagram
                </a>
              </div>
            </Fade>
          </div>

          {/* Logo orbit */}
          <Fade delay={200} className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{ transform: `translate(${(mouse.x - 50) * 0.15}px, ${(mouse.y - 50) * 0.15}px)` }}
            >
              <svg viewBox="0 0 400 400" className="orbit-spin absolute inset-0 h-full w-full text-rose">
                <defs>
                  <path id="ring" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
                </defs>
                <text fontSize="13" letterSpacing="7" fill="currentColor" className="uppercase">
                  <textPath href="#ring">Headspa · Maderoterapie · Eberlin · Fox Dreams · Klid · </textPath>
                </text>
              </svg>
              <div className="absolute inset-[16%] rounded-full border border-rose/30" />
              <div aria-hidden className="logo-aura absolute inset-[19%] rounded-full" />
              <div className="absolute inset-[22%] grid place-items-center rounded-full bg-pearl shadow-[0_0_120px_-10px_var(--rose-gold)]" style={{ transform: `perspective(800px) rotateX(${(50 - mouse.y) * 0.12}deg) rotateY(${(mouse.x - 50) * 0.12}deg)` }}>
                <img src={logo.url} alt="Fox Dreams logo" className="logo-pulse h-[78%] w-[78%] object-contain" />
              </div>
            </div>
          </Fade>
        </section>

        {/* Ritual finder */}
        <section id="ritualy" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Fade>
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-rose">Najděte svůj rituál</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-6xl">Jak se dnes cítíte?</h2>
          </Fade>
          <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-3">
              {moods.map((x, i) => (
                <button
                  key={x.key}
                  onClick={() => setMood(i)}
                  onMouseEnter={() => setMood(i)}
                  className={`group flex items-center justify-between rounded-2xl border px-6 py-6 text-left transition-all duration-500 ${
                    i === mood ? "border-rose/60 bg-rose/10" : "border-pearl/10 hover:border-rose/30"
                  }`}
                >
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-pearl/50">0{i + 1}</span>
                    <span className={`mt-1 block font-serif text-2xl transition ${i === mood ? "text-rose" : ""}`}>{x.feel}</span>
                  </span>
                  <span className={`text-xl transition ${i === mood ? "translate-x-0 text-rose opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
                </button>
              ))}
            </div>
            <div key={m.key} className="noir-glass overflow-hidden rounded-[2rem] animate-in fade-in duration-700">
              <div className="relative h-72 overflow-hidden md:h-80">
                <img src={m.img} alt={m.title} loading="lazy" className="h-full w-full scale-105 object-cover transition-transform duration-[2000ms] hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />
                <span className="absolute right-5 top-5 rounded-full noir-glass px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-rose">{m.time}</span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-4xl">{m.title}</h3>
                <p className="mt-4 leading-relaxed text-pearl/70">{m.text}</p>
                <a href="#kontakt" className="mt-6 inline-block text-[0.7rem] uppercase tracking-[0.3em] text-rose underline-offset-8 hover:underline">
                  Rezervovat tento rituál →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section id="prubeh" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Fade>
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-rose">Průběh Headspa</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">Čtyři kroky ke klidu</h2>
          </Fade>
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <button
                key={s.t}
                onClick={() => setStep(i)}
                className={`relative overflow-hidden rounded-3xl border p-7 text-left transition-all duration-700 ${
                  i === step ? "border-rose/50 bg-noir-soft/70 md:-translate-y-3" : "border-pearl/10 bg-noir/40"
                }`}
              >
                <span className="font-serif text-6xl text-rose/80">{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{s.t}</h3>
                <p className={`mt-3 text-sm leading-relaxed text-pearl/65 transition-all duration-700 ${i === step ? "opacity-100" : "opacity-50"}`}>{s.d}</p>
                <span className="absolute inset-x-0 bottom-0 h-px bg-pearl/10">
                  <span
                    className="block h-full bg-rose"
                    style={{ width: i === step ? "100%" : "0%", transition: i === step ? "width 4.5s linear" : "none" }}
                  />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="salon" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <Fade>
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-rose">Salon</p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Místo, kde čas zpomaluje</h2>
            </Fade>
          </div>
          <div
            ref={stripRef}
            onPointerEnter={(e) => e.pointerType === "mouse" && (pausedRef.current = true)}
            onPointerLeave={() => (pausedRef.current = false)}
            onPointerDown={(e) => {
              pausedRef.current = true;
              if (e.pointerType !== "mouse") return;
              const el = stripRef.current!;
              const sx = e.clientX, sl = el.scrollLeft;
              const move = (ev: PointerEvent) => {
                const half = el.scrollWidth / 2;
                let n = sl - (ev.clientX - sx);
                if (n < 0) n += half;
                if (n >= half) n -= half;
                el.scrollLeft = n;
              };
              const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
              addEventListener("pointermove", move);
              addEventListener("pointerup", up);
            }}
            onTouchEnd={() => setTimeout(() => (pausedRef.current = false), 1500)}
            className="mt-14 flex cursor-grab select-none gap-5 overflow-x-auto py-6 [perspective:1200px] [scrollbar-width:none] active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          >
            {[...gallery, ...gallery].map((g, i) => (
              <figure
                key={g.cap + i}
                className="gallery-card group relative h-[440px] w-[78vw] max-w-[320px] shrink-0 overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_var(--noir)]"
                style={{ animationDelay: `${i * -1.3}s` }}
              >
                <img src={g.img} alt={g.cap} draggable={false} className="h-full w-full object-cover grayscale-[40%] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/90 to-transparent opacity-80 transition group-hover:opacity-50" />
                <figcaption className="absolute bottom-6 left-6 font-serif text-2xl italic">{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Fade className="noir-glass relative overflow-hidden rounded-[2.5rem] p-10 md:p-16">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
            <div className="relative grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.45em] text-rose">Rezervace</p>
                <h2 className="mt-4 font-serif text-4xl md:text-6xl">Dopřejte si večer jen pro sebe.</h2>
                <a href="tel:+420777123456" className="mt-10 inline-flex rounded-full bg-rose px-8 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-noir transition hover:bg-pearl">
                  Zavolat a rezervovat
                </a>
              </div>
              <dl className="grid gap-6 text-sm">
                {[
                  ["Telefon", "+420 777 123 456"],
                  ["E-mail", "petra@foxdreams.cz"],
                  ["Instagram", "@foxdreams_beautysalon"],
                  ["Otevřeno", "Út–Pá 10–20 · So 9–14"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-pearl/10 pb-4">
                    <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-pearl/50">{k}</dt>
                    <dd className="mt-1 font-serif text-2xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Fade>
        </section>
      </main>

      <footer className="relative z-10 border-t border-pearl/10 px-6 py-14 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-pearl">
          <img src={logo.url} alt="Fox Dreams" className="h-16 w-16 object-contain" />
        </span>
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.35em] text-pearl/50">© Fox Dreams Beauty Salon</p>
        <Link to="/varianta-2" className="mt-4 inline-block text-[0.7rem] uppercase tracking-[0.3em] text-rose hover:underline">
          Zobrazit návrh B →
        </Link>
      </footer>
    </div>
  );
}
