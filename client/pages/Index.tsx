import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
      } catch (err) {
        // Autoplay blocked, show play button
        setNeedsInteraction(true);
      }
    };

    tryPlay();
  }, []);

  const handleManualPlay = async () => {
    try {
      await videoRef.current?.play();
      setNeedsInteraction(false);
    } catch (e) {
      // ignore
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fullscreen video background */}
      <div className="fixed inset-0 -z-10">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/3183172/3183172-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Hero content (left aligned, bottom) */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-screen flex-col items-start justify-end px-6 pt-16 pb-24 text-left text-white"
      >
        <div className="w-full max-w-5xl pl-6 md:pl-12 lg:pl-20">
          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          >
            Powering the
            <br />
            Future of Payments
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/85">
            Fast, secure payment infrastructure for modern businesses.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-md hover:shadow-lg transition"
            >
              Integrate with us
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-md hover:opacity-95 transition"
            >
              Schedule a demo
            </a>
          </div>
        </div>

        {/* Play overlay if autoplay blocked */}
        {needsInteraction && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleManualPlay}
              className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur hover:bg-white/20 transition"
              aria-label="Play background video"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
              </svg>
              Play background
            </button>
          </div>
        )}
      </section>

      {/* Content sections for anchors */}
      <section id="about" className="bg-background/70 backdrop-blur-sm">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We are a creative studio focused on building fast, accessible, and
            beautiful web experiences.
          </p>
        </div>
      </section>

      <section id="services" className="bg-background">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Design</h3>
              <p className="mt-2 text-muted-foreground">
                Branding, UI/UX, and prototypes.
              </p>
            </li>
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Development</h3>
              <p className="mt-2 text-muted-foreground">
                Web apps, sites, and integrations.
              </p>
            </li>
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Performance</h3>
              <p className="mt-2 text-muted-foreground">
                Optimization and SEO best practices.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="bg-background/70 backdrop-blur-sm">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Ready to start? Email us at hello@example.com and we���ll be in
            touch.
          </p>
        </div>
      </section>
    </main>
  );
}
