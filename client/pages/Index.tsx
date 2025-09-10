import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fullscreen video background */}
      <div className="fixed inset-0 -z-10">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/3183172/3183172-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Hero content */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center text-white"
      >
        <h1
          id="hero-heading"
          className="max-w-4xl text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm"
        >
          Welcome to Our Site
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/85">
          We craft modern, responsive experiences your customers will love.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <a href="#about">
            <Button className="h-12 px-6 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
              Learn More
            </Button>
          </a>
          <a
            href="#contact"
            className="h-12 inline-flex items-center rounded-md px-6 text-base font-medium text-white/90 hover:text-white/100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Content sections for anchors */}
      <section id="about" className="bg-background/70 backdrop-blur-sm">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We are a creative studio focused on building fast, accessible, and beautiful web experiences.
          </p>
        </div>
      </section>

      <section id="services" className="bg-background">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Design</h3>
              <p className="mt-2 text-muted-foreground">Branding, UI/UX, and prototypes.</p>
            </li>
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Development</h3>
              <p className="mt-2 text-muted-foreground">Web apps, sites, and integrations.</p>
            </li>
            <li className="rounded-xl border bg-card/70 p-6 backdrop-blur-sm transition hover:shadow-xl">
              <h3 className="text-xl font-semibold">Performance</h3>
              <p className="mt-2 text-muted-foreground">Optimization and SEO best practices.</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="bg-background/70 backdrop-blur-sm">
        <div className="container mx-auto py-24 md:py-32 text-foreground">
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Ready to start? Email us at hello@example.com and we���ll be in touch.
          </p>
        </div>
      </section>
    </main>
  );
}
