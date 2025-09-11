import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  // Dummy video list to cycle through as background (public sample clips)
  const videoList = [
    "https://media.istockphoto.com/id/1648052484/video/customer-use-mobile-phone-pay-contactless.mp4?s=mp4-640x640-is&k=20&c=yWb1V4hxS-xCeu6uJlDAv76_8WPAqn7bgtaa-EkxiBg=",
  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  // Attempt to play whenever the video source changes
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
        setNeedsInteraction(false);
      } catch (err) {
        // Autoplay blocked, show play button
        setNeedsInteraction(true);
      }
    };

    tryPlay();
  }, [currentVideo]);

  // Cycle videos every 12 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentVideo((v) => (v + 1) % videoList.length);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  const handleManualPlay = async () => {
    try {
      await videoRef.current?.play();
      setNeedsInteraction(false);
    } catch (e) {
      // ignore
    }
  };

  // Carousel slides for feature cards
  const slides = [
    {
      key: "acquiring",
      title: "Acquiring support",
      description:
        "Local and cross-border acquiring with settlement and reconciliation for acquirers.",
      image: "https://picsum.photos/seed/acquiring/800/800",
    },
    {
      key: "card",
      title: "Card Payments",
      description:
        "End-to-end card acceptance: tokenization, authorization, settlement and reporting.",
      image: "https://picsum.photos/seed/card/800/800",
    },
    {
      key: "upi",
      title: "UPI payments",
      description: "Fast, low-cost UPI acceptance with instant settlement and reconciliation.",
      image: "https://picsum.photos/seed/upi/800/800",
    },
    {
      key: "orchestration",
      title: "Payment Orchestration",
      description:
        "Smart routing, failover and optimization across multiple providers to maximize success rates.",
      image: "https://picsum.photos/seed/orchestration/800/800",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;
  const slideIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      slideIntervalRef.current = window.setInterval(() => {
        setCurrentSlide((s) => (s + 1) % slideCount);
      }, 5000);
    };

    start();
    return () => {
      if (slideIntervalRef.current) window.clearInterval(slideIntervalRef.current);
    };
  }, [slideCount]);

  const pauseCarousel = () => {
    if (slideIntervalRef.current) {
      window.clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  const resumeCarousel = () => {
    if (!slideIntervalRef.current) {
      slideIntervalRef.current = window.setInterval(() => {
        setCurrentSlide((s) => (s + 1) % slideCount);
      }, 5000);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Hero content (video plays only in this section) */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-screen flex-col items-start justify-end px-6 pt-16 pb-16 md:pb-20 lg:pb-24 text-left text-white overflow-hidden"
      >
        {/* Video background inside hero only */}
        <div className="absolute inset-0 -z-10">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoList[currentVideo]}
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

        <div className="w-full max-w-5xl pl-6 md:pl-12 lg:pl-20">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
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
        <div className="container mx-auto py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="pl-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                The Next-Gen
                <br />
                Payment Company
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl text-left">
                A Smart payment infrastructure
              </p>

              <div className="mt-6 flex items-start gap-3">
                <span className="inline-block bg-sky-500 text-white px-3 py-1 rounded-md text-sm">
                  Designed in India
                </span>
                <span className="inline-block bg-slate-800 text-white px-3 py-1 rounded-md text-sm">
                  Delivered Globally
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-6 pl-28">
              <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-white/60 w-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 7v10a2 2 0 0 0 2 2h14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7a5 5 0 0 1 10 0"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Secure</div>
                    <div className="text-sm text-muted-foreground">
                      End-to-end payment security
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border bg-white/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3v18"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 12h18"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Speed</div>
                    <div className="text-sm text-muted-foreground">
                      Fast transaction processing
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border bg-white/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 12h6l3-9 3 18 3-9h6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Scalable</div>
                    <div className="text-sm text-muted-foreground">
                      Grow without limits
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global map section */}
      <section id="global-map" className="relative bg-background py-6 md:py-8 overflow-hidden">
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              <div className="relative w-full h-[320px] md:h-[420px] lg:h-[520px] flex items-center justify-center">
                <div
                  aria-hidden
                  className="w-full h-full max-w-6xl"
                  style={{
                    color: "#2caee4",
                    backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                    backgroundSize: "6px 6px",
                    WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
                    maskSize: "100% 100%",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    opacity: 0.98,
                  }}
                />

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4">
                  <h2 className="max-w-3xl text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white drop-shadow-sm leading-tight">
                    A Unified Global
                    <br />
                    Payment Processing Solution
                    <br />
                    for Acquirers - Banks and
                    <br />
                    Payment Aggregators
                  </h2>

                  <p className="mt-16 md:mt-20 text-center text-sm md:text-base text-slate-900 dark:text-white font-semibold">
                    Supports POS and E-com payments for
                  </p>

                  <div className="mt-4 flex items-center gap-12">
                    <div className="flex items-center gap-3 text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2caee4]">
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <rect x="1" y="2" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                          <rect x="3" y="5" width="4" height="3" rx="0.6" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">Cards</span>
                    </div>

                    <div className="flex items-center gap-3 text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2caee4]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <polygon points="4,6 12,12 4,18" fill="currentColor" />
                          <polygon points="12,6 20,12 12,18" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">UPI</span>
                    </div>

                    <div className="flex items-center gap-3 text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2caee4]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M5 6c3 1.5 6 1.5 10 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                          <path d="M5 18c3-1.5 6-1.5 10 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                          <path d="M7 3c1.5 4 1.5 8 0 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                          <path d="M17 3c-1.5 4-1.5 8 0 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">Net-Banking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="carousel" className="bg-background">
        <div className="container mx-auto py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div
                className="rounded-xl overflow-visible"
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    width: `${slides.length * 100}%`,
                    transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
                  }}
                >
                  {slides.map((s, idx) => (
                    <div key={idx} className="flex-shrink-0 px-4 sm:px-6 md:px-8" style={{ width: `${100 / slides.length}%` }}>
                      <div className="rounded-xl bg-white p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row gap-6 items-stretch md:min-h-[220px] overflow-hidden">
                        <div className="md:w-56 md:h-auto flex-shrink-0">
                          <img src={s.image} alt={s.title} className="w-full h-56 md:h-full object-cover rounded-lg border border-slate-100" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4">
                              <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-[#e6f7fb] text-[#2caee4]">
                                {s.key === "acquiring" ? (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M3 11h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M6 11v6h3v-4h6v4h3v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                  </svg>
                                ) : s.key === "card" ? (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                    <rect x="6" y="9" width="4" height="3" rx="0.6" fill="currentColor" />
                                  </svg>
                                ) : s.key === "upi" ? (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <polygon points="4,8 11,12 4,16" fill="currentColor" />
                                    <polygon points="13,8 20,12 13,16" fill="currentColor" />
                                  </svg>
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                    <circle cx="18" cy="6" r="2" fill="currentColor" />
                                    <circle cx="12" cy="16" r="2" fill="currentColor" />
                                    <path d="M7.5 7.5L11 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5 7.5L13 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            </div>

                            <h3 className="mt-4 text-lg md:text-2xl font-semibold text-slate-900">{s.title}</h3>
                            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">{s.description}</p>
                          </div>

                          <div className="mt-6">
                            <a href="#" className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[#2caee4]">
                              Learn more
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === currentSlide ? "bg-slate-900 dark:bg-white w-6" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="scale" className="bg-background">
        <div className="container mx-auto py-8 md:py-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Built for Scale, Engineered for
          </h2>
          <h3 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold">
            Security & Designed for Profitability
          </h3>
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
