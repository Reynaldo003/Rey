import { React, useEffect, useState } from "react";
import { IconCloud } from "../components/magicui/icon-cloud";
import { MagicCard } from "../components/magicui/magic-card";
import { Meteors } from "../components/magicui/meteors";
import { BoxReveal } from "../components/magicui/box-reveal";
import { SmoothCursor } from "../components/ui/smooth-cursor";
import { Dock, DockIcon } from "../components/magicui/dock";
import { Home } from "lucide-react";
import { AnimatedThemeToggler } from "../components/magicui/animated-theme-toggler";


function useSmoothScroll() {
    useEffect(() => {
        let lenis;
        (async () => {
            const { default: Lenis } = await import('lenis');
            lenis = new Lenis({ smoothWheel: true, lerp: 0.12 });
            const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        })();
        return () => { if (lenis) lenis.destroy(); };
    }, []);
}

function useScrollSpy() {
    useEffect(() => {
        const links = [...document.querySelectorAll('header nav a[href^="#"]')];
        const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                const a = map.get(e.target.id);
                if (!a) return;
                a.classList.toggle('dark:text-white', e.isIntersecting);
                a.classList.toggle('bg-white/10', e.isIntersecting);
            });
        }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 });
        document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));
        return () => obs.disconnect();
    }, []);
}

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add("magic-reveal");
            });
        }, { threshold: 0.08 });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
}
function useSpotlight() {
    useEffect(() => {
        const root = document.documentElement;
        const move = (e) => {
            const x = e.clientX / window.innerWidth * 100;
            const y = e.clientY / window.innerHeight * 100;
            root.style.setProperty("--mx", `${x}%`);
            root.style.setProperty("--my", `${y}%`);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, []);
}

const nav = [
    { id: "inicio", label: "Inicio" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "habilidades", label: "Habilidades" },
    { id: "contacto", label: "Contacto" },
];

const images = [
    "/django.svg",
    "/flask.svg",
    "/github.svg",
    "/html.svg",
    "/javascript.svg",
    "/mysql.svg",
    "/postgresql.svg",
    "/python.svg",
    "/react.svg",
    "/tailwind-css.svg",
    "/vite.svg",
    "/vercel.png",
    "/rest.png",
];


const proyectos = [
    { title: "RolMusic — Reproductor Musical", desc: "Reproductor de Musica con buscador online integrado.", tech: ["Python", "PyQt5", "FFMPEG", "Pytube"], link: "https://reynaldo003.github.io/RolMusicWeb/", estado: "Desarrollo Completo" },
    { title: "RObots — Chatbots", desc: "Chatbot IA que recopila informacion de clientes.", tech: ["Flask", "Python", "Meta API", "Google API"], link: "https://r-obots.vercel.app/", estado: "Desarrollo Completado" },
    { title: "Workflow App", desc: "Dashboard, Gestion de proyectos, Excel/Word/Powerbi y automatizaciones.", tech: ["React", "Django", "Postgres", "API's"], link: "#", estado: "En desarrollo..." },
];

const skills = ["React", "Vite", "JavaScript", "Tailwind", "Django", "PostgreSQL", "MySQL", "REST", "Vercel", "Docker"];

export default function App() {
    useReveal();
    useSpotlight();
    useSmoothScroll();
    useScrollSpy();

    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

    const handleThemeToggle = async () => {
        await document.startViewTransition(() => {
            const dark = document.documentElement.classList.toggle("dark");
            setIsDarkMode(dark);
        }).ready;
    };

    return (
        <div className="min-h-dvh relative text-neutral-950 dark:text-neutral-300 dark:bg-[#0b0b0c] bg-neutral-200">
            <div className="pointer-events-none fixed inset-0 spotlight transition-[background-position] duration-200" />

            <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-md bg-neutral-100 text-neutral-950 dark:text-neutral-200  dark:supports-[backdrop-filter]:bg-black/25 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                <div className="container-std h-16 flex items-center justify-between">
                    <a href="#inicio" className="font-semibold tracking-wide p-10">Reynaldo Vallejo</a>
                    <nav className="hidden md:flex items-center gap-1">
                        {nav.map(n => (
                            <a key={n.id} href={`#${n.id}`}
                                className="px-3 py-2 bg-black/5 dark:bg-white/5 rounded-xl text-sm text-black/70 hover:text-black hover:bg-black/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5">
                                {n.label}
                            </a>
                        ))}
                    </nav>
                    <a href="#contacto"
                        className="btn-magic rounded-xl h-10 px-4 grid place-items-center m-10 text-sm
                        bg-[rgb(var(--accent))] text-white hover:opacity-95">
                        Contrátame
                    </a>
                </div>
            </header>

            <main className="pl-48 pr-48 pt-20 pb-20 relative overflow-hidden">
                <section id="inicio" className={`scroll-mt-24 py-12 md:py-16 relative ${container}`}>
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-8 left-0 right-0 h-[420px]">
                            <Meteors />
                        </div>
                    </div>
                    <div className="container-std grid md:grid-cols-5 gap-8 items-center">
                        <div className="md:col-span-3">
                            <h1 data-reveal className="text-balance text-4xl md:text-5xl font-semibold tracking-tight">
                                Desarrollador <span className="text-[rgb(var(--accent))]">Full-Stack</span> para productos con <span className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4">impacto real</span>.
                            </h1>
                            <p data-reveal className="magic-reveal-del-1 mt-4 max-w-prose text-neutral-800 dark:text-white/70">
                                Dashboards, chatbots y sitios corporativos. Django/Node, despliegues en hosting de su preferencia, enfoque en rendimiento y seguridad.
                            </p>
                            <div data-reveal className="magic-reveal-del-2 mt-6 flex gap-3 flex-wrap">
                                <a href="/CV_Reynaldo_Vallejo.pdf" className="btn-magic rounded-xl h-11 px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-medium">Descargar CV</a>
                                <a href="#contacto" className="rounded-xl h-11 px-5 py-2 border border-black/15 dark:border-white/15 text-black/90 dark:text-white/90 hover:bg-white/5">Contacto</a>
                            </div>
                            <ul className="mt-6 grid grid-cols-2 sm:flex gap-4 sm:gap-6 text-black/70 dark:text-white/70 text-sm">
                                <li><span className="text-black dark:text-white font-medium">3</span> Proyectos en produccion</li>
                                <li><span className="text-black dark:text-white font-medium"></span>Desarrollo completo y seguro </li>
                                <li className="col-span-2 sm:col-span-1"><span className="text-black dark:text-white font-medium">100%</span> Actualizado</li>
                            </ul>
                        </div>

                        {/* Card identidad */}
                        <div data-reveal className="md:col-span-2 card-gradient p-5 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="size-14 rounded-xl bg-black/10 dark:bg-white/10 grid place-items-center text-xl font-semibold">RV</div>
                                <div>
                                    <div className="font-medium">Reynaldo Vallejo</div>
                                    <div className="text-black/60 dark:text-white/60 text-sm">Full-Stack Developer</div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                <a href="https://github.com/Reynaldo003" target="_blank" className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 hover:bg-white/5">GitHub</a>
                                <a href="https://www.linkedin.com/in/momerdev/" target="_blank" className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 hover:bg-white/5">LinkedIn</a>
                            </div>
                            <div className="mt-3 text-black/60 dark:text-white/60 text-sm">📍 Cordoba, Veracruz · Hibrido</div>
                        </div>
                    </div>
                </section>

                {/* PROYECTOS (bento grid + cartas con borde degradado animado) */}
                <section id="proyectos" className="scroll-mt-24 py-16 border-t  border-black/10 dark:border-white/10">
                    <div className={container}>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Proyectos destacados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {proyectos.map((p, i) => (
                                <MagicCard key={p.title} data-reveal role="article"
                                    className={`hover:translate-y-[-2px] p-5 transition-transform rounded-2xl magic-reveal-del-${i}`}>
                                    {/* Título + # */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{p.title}</h3>
                                        <span className="text-xs text-neutral-900 dark:text-neutral-400">#{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    {/* Mini case study */}
                                    <div className="mt-3 text-neutral 800 dark:text-neutral-300 space-y-1 text-sm leading-relaxed">
                                        <p><span className="text-black/75 dark:text-white/60">Descripcion:</span> {p.desc}</p>
                                        <p><span className="text-black/75 dark:text-white/60">Estado:</span> {p.estado}</p>
                                    </div>
                                    {/* Chips */}
                                    <ul className="mt-4 flex flex-wrap gap-2 text-xs text-black/70 dark:text-white/70">
                                        {p.tech.map(t => (
                                            <li key={t} className="border text-black/70 border-black/15 dark:border-white/15 dark:text-neutral-200 rounded-full px-2.5 py-1">{t}</li>
                                        ))}
                                    </ul>
                                    <a href={p.link} target="_blank" className="mt-5 inline-flex items-center gap-2 text-neutral-900 dark:text-neutral-300 text-sm hover:underline">
                                        Detalles <span aria-hidden>→</span>
                                    </a>
                                </MagicCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCIA (timeline limpio) */}
                <section id="experiencia" className="scroll-mt-24 py-16 border-t border-black/10 dark:border-white/10">
                    <div className={container}>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Experiencia</h2>
                        <ol className="relative pl-6">
                            <span className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
                            <br />
                            <li data-reveal className="pb-8">
                                <div className="absolute -left-[7px] mt-1 size-3 rounded-full bg-[rgb(var(--accent))]" />
                                <div className="grid md:grid-cols-[240px_1fr] gap-3 ">
                                    <div className="text-sm text-neutral-800 dark:text-white/70">2024 — Reproductor de Musica</div>
                                    <div className="flex items-center">
                                        <BoxReveal><img src="/python.svg" alt="" className="w-10 h-10" /></BoxReveal>
                                        <BoxReveal><h3 className="pl-15 font-medium">Developer Python</h3></BoxReveal>
                                        <BoxReveal><p className="pl-15 text-neutral-800 dark:text-white/70">Reproductor de musica de escritorio con buscador/descargas de videos de youtube integrado.</p></BoxReveal>
                                    </div>
                                </div>
                            </li>
                            <li data-reveal className="pb-8">
                                <div className="absolute -left-[7px] mt-1 size-3 rounded-full bg-[rgb(var(--accent))]" />
                                <div className="grid md:grid-cols-[240px_1fr] gap-3">
                                    <div className="text-sm text-neutral-800 dark:text-white/70">2025 — Workflow App</div>
                                    <div className="flex items-center">
                                        <BoxReveal><img src="/volkswagen.svg" alt="" className="w-10 h-10" /></BoxReveal>
                                        <BoxReveal><h3 className="pl-15 font-medium">Full-Stack Developer</h3></BoxReveal>
                                        <BoxReveal><p className="pl-15 text-neutral-800 dark:text-white/70">Plataforma web corporativa, integraciones, automatizaciones, consumo de Excel/Word,  y panel administrativo.</p></BoxReveal>
                                    </div>
                                </div>
                            </li>
                            <li data-reveal>
                                <div className="absolute -left-[7px] mt-1 size-3 rounded-full bg-[rgb(var(--accent))]" />
                                <div className="grid md:grid-cols-[240px_1fr] gap-3">
                                    <div className="text-sm text-neutral-800 dark:text-white/70">2025 — RObots</div>
                                    <div className="flex items-center">
                                        <BoxReveal><img src="/logo2.png" alt="" className="rounded-full w-10 h-8" /></BoxReveal>
                                        <BoxReveal><h3 className="pl-15 font-medium">Backend Developer</h3></BoxReveal>
                                        <BoxReveal><p className="pl-15 text-neutral-800 dark:text-white/70">Chatbots IA de WhatsApp, consumo de API's, analítica y orquestación de flujos conversacionales.</p></BoxReveal>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* HABILIDADES (cloud de chips) */}
                <section id="habilidades" className="scroll-mt-24 py-16 border-t border-black/10 dark:border-white/10">
                    <div className={container}>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Habilidades</h2>
                        <div className="mx-auto max-w-xl overflow-hidden border-neutral-950 rounded-2xl bg-neutral-200 dark:bg-[#0b0b0c] flex items-center justify-center">
                            <IconCloud className="" images={images} />
                        </div>
                    </div>
                </section>

                {/* CONTACTO */}
                <section id="contacto" className="scroll-mt-24 py-16 border-t border-black/10 dark:border-white/10">
                    <div className={container}>
                        <h2 className="text-2xl md:text-3xl font-semibold">Hablemos</h2>
                        <p className="mt-2 text-neutral-800 dark:text-white/70 max-w-prose">
                            ¿Tienes un proyecto en mente? Escríbeme y lo revisamos.
                        </p>
                        <form
                            className="mt-6 grid gap-3 max-w-xl"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const d = new FormData(e.currentTarget);
                                const subject = encodeURIComponent("Contacto desde portafolio");
                                const body = encodeURIComponent(
                                    `Hola Reynaldo,\n\nSoy ${d.get("nombre")}.\n${d.get("mensaje")}\n\n${d.get("email")}`
                                );
                                window.location.href = `mailto:rvallejo276@gmail.com?subject=${subject}&body=${body}`;
                            }}
                        >
                            <div className="grid md:grid-cols-2 gap-3">
                                <input name="nombre" required placeholder="Tu nombre"
                                    className="h-11 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 outline-none focus:border-[rgb(var(--accent))]" />
                                <input name="email" type="email" required placeholder="Email"
                                    className="h-11 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 px-3 outline-none focus:border-[rgb(var(--accent))]" />
                            </div>
                            <textarea name="mensaje" rows="5" placeholder="Cuéntame sobre tu proyecto"
                                className="rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 p-3 outline-none focus:border-[rgb(var(--accent))]"></textarea>
                            <div>
                                <button className="btn-magic h-11 px-5 rounded-xl bg-[rgb(var(--accent))] text-white">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <SmoothCursor />

            <div className="fixed inset-x-0 bottom-[max(env(safe-area-inset-bottom))] pb-5 z-50 hidden sm:flex justify-center ">
                <Dock className="dark:bg-[#0b0b0c] bg-white/70 dark:text-white text-black m-0 dark:border-neutral-800 border-neutral-400" iconMagnification={60} iconDistance={100}>
                    <DockIcon className="flex items-center gap-3 ml-2">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            aria-label="Ir al inicio"
                            className="flex items-center justify-center"
                            rel="noreferrer"
                        >
                            <Home className="h-5 w-5 hover:h-6 hover:w-6" />
                        </button>
                    </DockIcon>

                    <div role="separator" aria-orientation="vertical" className="mx-2 h-10 w-px bg-black/25 dark:bg-white/15 self-stretch" />

                    <DockIcon className="bg-black/80 dark:bg-white/10">
                        <a href="https://www.linkedin.com/in/momerdev/" target="_blank" rel="noreferrer">
                            <img className="w-5 h-5 hover:h-6 hover:w-6" src="linkedin.svg" alt="Linkedin" loading="lazy" />
                        </a>
                    </DockIcon>
                    <DockIcon className="bg-black/80 dark:bg-white/10">
                        <a href="https://github.com/Reynaldo003" target="_blank" rel="noreferrer">
                            <img className="w-5 h-5 hover:h-6 hover:w-6" src="githubWhite.svg" alt="GitHub" loading="lazy" />
                        </a>
                    </DockIcon>

                    <div role="separator" aria-orientation="vertical" className="mx-2 h-10 w-px bg-black/25 dark:bg-white/15 self-stretch" />

                    <DockIcon className="flex items-center gap-3 mr-2 align-middle justify-center">
                        <AnimatedThemeToggler onClick={handleThemeToggle} className="h-5 w-5 hover:h-6 hover:w-6" />
                    </DockIcon>
                </Dock>
            </div>

            {/* Footer */}
            <footer className="border-t border-black/10 dark:border-white/10 py-10 text-black/70 dark:text-white/70">
                <div className={`${container} grid grid-cols-1 md:grid-cols-4 gap-8`}>
                    <div>
                        <div className="text-black dark:text-white font-semibold">Reynaldo Vallejo</div>
                        <p className="text-black dark:text-white mt-2 text-sm">Full-Stack | Django/Node | Chatbots y dashboards.</p>
                    </div>
                    <div>
                        <div className="text-black dark:text-white text-sm font-medium mb-2">Enlaces</div>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#proyectos" className="hover:text-white">Proyectos</a></li>
                            <li><a href="#experiencia" className="hover:text-white">Experiencia</a></li>
                            <li><a href="#habilidades" className="hover:text-white">Habilidades</a></li>
                            <li><a href="/CV_Reynaldo_Vallejo.pdf" className="hover:text-white">Descargar CV</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-black dark:text-white text-sm font-medium mb-2">Contacto</div>
                        <ul className="space-y-1 text-sm">
                            <li>📍 Córdoba, Veracruz</li>
                            <li><a href="mailto:toby@example.com" className="hover:text-white">rvallejo276@gmail.com</a></li>
                            <li><a href="https://github.com/Reynaldo003" target="_blank" className="hover:text-white">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/momerdev/" target="_blank" className="hover:text-white">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-black dark:text-white text-sm font-medium mb-2">Estado</div>
                        <p className="text-sm">✅ Abierto a proyectos (remoto / híbrido).</p>
                        <p className="text-xs mt-2">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
                    </div>
                </div>
                <div className={`${container} mt-8 flex items-center justify-between text-xs`}>
                    <span>© {new Date().getFullYear()} Reynaldo Vallejo</span>
                    <span>Hecho con React + Tailwind</span>
                </div>
            </footer>
        </div >

    );
}