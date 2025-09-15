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
      description:
        "Fast, low-cost UPI acceptance with instant settlement and reconciliation.",
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
      if (slideIntervalRef.current)
        window.clearInterval(slideIntervalRef.current);
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

  // Testimonials data and carousel control
  const testimonials = [
    {
      quote:
        "We want to express our sincere gratitude for our partnership. Your module has provided us with valuable and practical insights into our business, and we look forward to further strengthening our partnership.",
      name: "Chetan Nagaraju",
      position: "Senior Director Business Finance",
      logo: "/placeholder.svg",
    },
    {
      quote:
        "Their team helped us integrate quickly and provided responsive support. Transactions are processed reliably and reporting is clear. We consider them a key partner in our growth.",
      name: "Nisha Patel",
      position: "Head of Payments",
      logo: "/placeholder.svg",
    },
    {
      quote:
        "By optimizing routing and reconciliation, we reduced costs and improved success rates. Their analytics gave us actionable insights that drove measurable results.",
      name: "Rajat Singh",
      position: "VP, Operations",
      logo: "/placeholder.svg",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    };

    start();
    return () => {
      if (testimonialIntervalRef.current)
        window.clearInterval(testimonialIntervalRef.current);
    };
  }, [testimonials.length]);

  const pauseTestimonials = () => {
    if (testimonialIntervalRef.current) {
      window.clearInterval(testimonialIntervalRef.current);
      testimonialIntervalRef.current = null;
    }
  };

  const resumeTestimonials = () => {
    if (!testimonialIntervalRef.current) {
      testimonialIntervalRef.current = window.setInterval(() => {
        setCurrentTestimonial((i) => (i + 1) % testimonials.length);
      }, 6000);
    }
  };

  const AnimatedNumber = ({
    to,
    prefix = "",
    suffix = "",
    duration = 1500,
  }: {
    to: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
  }) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * to);
        setValue(current);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      return () => {
        startTime = null;
      };
    }, [to, duration]);

    return (
      <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
        {prefix}
        {value}
        {suffix}
      </span>
    );
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
      <section
        id="global-map"
        className="relative bg-background py-6 md:py-8 overflow-hidden"
      >
        <div className="container relative mx-auto">
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              <div className="relative w-full h-[320px] md:h-[420px] lg:h-[520px] flex items-center justify-center">
                <div
                  aria-hidden
                  className="w-full h-full max-w-6xl"
                  style={{
                    color: "#2caee4",
                    backgroundImage:
                      "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                    backgroundSize: "6px 6px",
                    WebkitMaskImage:
                      "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage:
                      "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
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
                        <svg
                          width="20"
                          height="14"
                          viewBox="0 0 20 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <rect
                            x="1"
                            y="2"
                            width="18"
                            height="10"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            fill="none"
                          />
                          <rect
                            x="3"
                            y="5"
                            width="4"
                            height="3"
                            rx="0.6"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Cards
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2caee4]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <polygon
                            points="4,6 12,12 4,18"
                            fill="currentColor"
                          />
                          <polygon
                            points="12,6 20,12 12,18"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        UPI
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-base md:text-lg text-slate-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2caee4]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                          />
                          <path
                            d="M12 3v18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 12h18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 6c3 1.5 6 1.5 10 0"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M5 18c3-1.5 6-1.5 10 0"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M7 3c1.5 4 1.5 8 0 12"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M17 3c-1.5 4-1.5 8 0 12"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        Net-Banking
                      </span>
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
                className="rounded-xl overflow-hidden"
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
                    <div
                      key={idx}
                      className="flex-shrink-0 px-4 sm:px-6 md:px-8"
                      style={{ width: `${100 / slides.length}%` }}
                    >
                      <div className="rounded-xl bg-white p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row gap-6 items-stretch md:min-h-[220px] overflow-hidden">
                        <div className="md:w-56 md:h-auto flex-shrink-0">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-56 md:h-full object-cover rounded-lg border border-slate-300"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4">
                              <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-[#e6f7fb] text-[#2caee4]">
                                {s.key === "acquiring" ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                  >
                                    <path
                                      d="M3 11h18"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M6 11v6h3v-4h6v4h3v-6"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 3v4"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                ) : s.key === "card" ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                  >
                                    <rect
                                      x="3"
                                      y="6"
                                      width="18"
                                      height="12"
                                      rx="2"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                    />
                                    <rect
                                      x="6"
                                      y="9"
                                      width="4"
                                      height="3"
                                      rx="0.6"
                                      fill="currentColor"
                                    />
                                  </svg>
                                ) : s.key === "upi" ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                  >
                                    <polygon
                                      points="4,8 11,12 4,16"
                                      fill="currentColor"
                                    />
                                    <polygon
                                      points="13,8 20,12 13,16"
                                      fill="currentColor"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                  >
                                    <circle
                                      cx="6"
                                      cy="6"
                                      r="2"
                                      fill="currentColor"
                                    />
                                    <circle
                                      cx="18"
                                      cy="6"
                                      r="2"
                                      fill="currentColor"
                                    />
                                    <circle
                                      cx="12"
                                      cy="16"
                                      r="2"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M7.5 7.5L11 14"
                                      stroke="currentColor"
                                      strokeWidth="1.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M16.5 7.5L13 14"
                                      stroke="currentColor"
                                      strokeWidth="1.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>

                            <h3 className="mt-4 text-lg md:text-2xl font-semibold text-slate-900">
                              {s.title}
                            </h3>
                            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
                              {s.description}
                            </p>
                          </div>

                          <div className="mt-6">
                            <a
                              href="#"
                              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[#2caee4]"
                            >
                              Learn more
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                              >
                                <path
                                  d="M5 12h14"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
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
                      i === currentSlide
                        ? "bg-slate-900 dark:bg-white w-6"
                        : "bg-slate-300"
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

      <section id="features" className="bg-background">
        <div className="w-full border-t border-b border-slate-300">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto py-12 md:py-16">
            <li className="flex flex-col items-start text-left gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-300">
              <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f7fb] text-[#2caee4]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Enterprise-Grade Performance
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Handle 5000+ TPS, cloud-native with 99.99% uptime.
                </p>
              </div>
            </li>

            <li className="flex flex-col items-start text-left gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-300">
              <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f7fb] text-[#2caee4]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 2l7 4v6c0 5-3.5 9.7-7 10-3.5-0.3-7-5-7-10V6l7-4z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Compliance
                  <br />
                  First
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  PCI-DSS, PCI-3DS, PCI-S3, ISO 27001, RBI SAR certified.
                </p>
              </div>
            </li>

            <li className="flex flex-col items-start text-left gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-300">
              <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f7fb] text-[#2caee4]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M3 17h18v3H3z" fill="currentColor" />
                  <path
                    d="M7 13V7h2v6H7zM11 13V4h2v9h-2zM15 13v-3h2v3h-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Profit-Driven Intelligence
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real-time analytics to maximize margins.
                </p>
              </div>
            </li>

            <li className="flex flex-col items-start text-left gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r-0 border-slate-300">
              <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f7fb] text-[#2caee4]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 2v4M12 18v4M4 12h4M16 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  Modular
                  <br />
                  Deployment
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Integrate only what you need, when you need it.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="products" className="bg-[#202c5c]">
        <div className="container mx-auto py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8">
            Mylapay Product Suites
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                  aria-hidden
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M3 11h18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 11v6h3v-4h6v4h3v-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3v4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">Mylapay TokenX</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Card Tokenization - COF & Alt ID
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Encrypt | Process | Tokenize
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 3v18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 12h18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">Mylapay Secure</h3>
                  <p className="mt-1 text-sm text-white/90">
                    3DS Server certified by EMVCo
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Detect | Prevent | Authenticate
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M4 7h16v10H4z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <path
                      d="M8 11h8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">Mylapay C-Switch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Base I Auth Switch for Card Payments
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Integrate | Transact | Authorize
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 2v4M12 18v4M4 12h4M16 12h4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">IntelleWatch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Fraud Risk Management (FRM) System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Monitor | Block | Safeguard
                  </p>
                </div>
              </div>

              {/* 5 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M3 7h18v10H3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">IntelleSettle</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Base II Clearing & Settlement System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Submit | Collect | Settle
                  </p>
                </div>
              </div>

              {/* 6 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M4 7h16v10H4z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">IntelleSolve</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Chargeback Management System
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Defend | Resolve | Recover
                  </p>
                </div>
              </div>

              {/* 7 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M3 7h18v10H3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">Intelle360</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Analytics Suite for Acquiring Payments
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Intelligence | Protection | Growth
                  </p>
                </div>
              </div>

              {/* 8 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 2l4 4-4 4-4-4 4-4z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">Mylapay U-Switch</h3>
                  <p className="mt-1 text-sm text-white/90">
                    UPI Switch for PSPs, Beneficiary Banks
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Connect | Route | Approve
                  </p>
                </div>
              </div>

              {/* 9 */}
              <div className="rounded-lg border border-[#219dd2] bg-[#202c5c] p-6 text-white group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1b355f] to-[#219dd2] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
                <a
                  href="#"
                  className="absolute top-4 right-4 relative z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#219dd2]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12l7-7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <div className="flex flex-col items-start relative z-10">
                  <svg
                    className="h-8 w-8 text-white mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 2l4 4 4 4-4 4-4 4-4-4-4-4 4-4 4-4z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold">IntellePro</h3>
                  <p className="mt-1 text-sm text-white/90">
                    Real-time TMS for UPI Transactions
                  </p>
                  <p className="mt-2 text-xs text-[#219dd2] font-medium">
                    Reconcile | Settle | Recover
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="counters" className="bg-white">
        <div className="container mx-auto py-6 md:py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center divide-x divide-slate-200">
              <div className="px-6 py-4">
                <AnimatedNumber to={1} suffix="B+" />
                <div className="mt-2 text-sm text-slate-600">
                  transactions processed
                </div>
              </div>

              <div className="px-6 py-4">
                <AnimatedNumber to={100} prefix="$" suffix="B+" />
                <div className="mt-2 text-sm text-slate-600">
                  in value handled annually
                </div>
              </div>

              <div className="px-6 py-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
                  Millions
                </span>
                <div className="mt-2 text-sm text-slate-600">
                  of dollars saved in cost
                </div>
              </div>

              <div className="px-6 py-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
                  Zero
                </span>
                <div className="mt-2 text-sm text-slate-600">
                  Leakage guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clients" className="bg-white">
        <div className="container mx-auto py-10">
          <h3 className="text-center text-sm font-semibold text-slate-700 mb-6">
            Trusted By The Top Payment Aggregator & Gateways
          </h3>

          <div className="flex items-center justify-center">
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
            .logo-item{opacity:0;transform:translateY(12px);}
            .logo-item.show{opacity:1;transform:translateY(0);}
            `}</style>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center max-w-4xl w-full">
              {/* Use placeholder logos in public/placeholder.svg; replace src with real logos when available */}
              <img
                src="/placeholder.svg"
                alt="PayU"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.05s forwards" }}
              />
              <img
                src="/placeholder.svg"
                alt="Payswiff"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.10s forwards" }}
              />
              <img
                src="/placeholder.svg"
                alt="Juspay"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.15s forwards" }}
              />
              <img
                src="/placeholder.svg"
                alt="ezetap"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.20s forwards" }}
              />
              <img
                src="/placeholder.svg"
                alt="magnati"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.25s forwards" }}
              />
              <img
                src="/placeholder.svg"
                alt="Razorpay"
                className="logo-item mx-auto h-8 w-auto"
                style={{ animation: "fadeUp 500ms ease 0.30s forwards" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white">
        <div className="container mx-auto py-12 md:py-16">
          <div className="flex justify-center">
            <div className="relative w-full max-w-5xl">
              {/* decorative shadow under the carousel */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[94%] h-8 bg-white rounded-xl filter blur-2xl opacity-40"></div>

              <div
                className="relative"
                onMouseEnter={pauseTestimonials}
                onMouseLeave={resumeTestimonials}
              >
                <div className="overflow-hidden min-h-[220px]">
                  <div className="relative h-auto">
                    {testimonials.map((t, idx) => (
                      <div
                        key={idx}
                        className={`w-full transition-all duration-700 ease-[cubic-bezier(.2,.9,.3,1)] ${
                          idx === currentTestimonial
                            ? "opacity-100 translate-y-0 block"
                            : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden"
                        }`}
                      >
                        <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 md:p-12 shadow-[0_18px_30px_rgba(16,24,40,0.08)]">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                {t.quote.split(" ").slice(0, 8).join(" ")}
                                {t.quote.length > 0 ? "..." : ""}
                              </h3>
                            </div>

                            <div className="flex flex-col items-start md:items-end">
                              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                {t.quote}
                              </p>

                              <div className="mt-6 flex items-center gap-4">
                                <img
                                  src={t.logo}
                                  alt={`${t.name} logo`}
                                  className="h-10 w-auto"
                                />
                                <div className="text-left md:text-right">
                                  <div className="text-sm font-semibold text-slate-900">
                                    {t.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {t.position}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`h-2 w-8 rounded-full transition-all ${i === currentTestimonial ? "bg-slate-800" : "bg-slate-200"}`}
                      aria-label={`Show testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who" className="bg-white">
        <div className="container mx-auto py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="pr-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Who We Are
              </h2>
              <p className="mt-3 text-base text-slate-700 max-w-xl leading-relaxed">
                Mylapay is an emerging fintech startup (Minded Technologies &
                Services Pvt Ltd), focused on secure payments, tokenization, and
                intelligent routing. We partner with banks, PSPs and aggregators
                to deliver high performance payment infrastructure and fraud
                protection.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="text-sm text-slate-600">Founded</div>
                <div className="font-semibold">2019</div>

                <div className="ml-6 text-sm text-slate-600">Headquarters</div>
                <div className="font-semibold">Bengaluru</div>
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-block rounded-md bg-[#202c5c] px-4 py-2 text-white font-medium hover:bg-[#192247]"
                >
                  Contact Sales
                </a>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <div className="text-xs font-medium text-slate-700 mb-4">
                  Backed by Prominent Investors
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 items-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center h-12 rounded-md bg-white/80 border border-slate-100 hover:shadow-md transition"
                    >
                      <img
                        src="/placeholder.svg"
                        alt={`Investor ${i + 1}`}
                        className="h-6 w-auto grayscale opacity-90 hover:grayscale-0 transition"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-xs font-medium text-slate-700 mb-4">
                  Certifications & Badges
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 items-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center h-12 rounded-md bg-white/80 border border-slate-100 hover:shadow-md transition"
                    >
                      <img
                        src="/placeholder.svg"
                        alt={`Badge ${i + 1}`}
                        className="h-6 w-auto grayscale opacity-90 hover:grayscale-0 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </section>

      {/* Footer */}
      <footer className="bg-[#05060a] text-white">
        <div className="container mx-auto py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <img
                  src="/placeholder.svg"
                  alt="Mylapay"
                  className="h-8 w-auto"
                />
                <span className="font-semibold">Mylapay</span>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Copyright© 2025 Mylapay.com
              </p>
              <p className="mt-2 text-xs text-slate-500">
                For grievance resolution, please contact our Grievance Officer
                at grievance@mylapay.com.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-200">
                  Resources
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Case Study
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-200">
                  Developers
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      SDKs
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-200">
                  Company
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-200">
                  Products
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Mylapay Secure
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      Mylapay Switch
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition-colors" href="#">
                      IntelleWatch
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold mb-3 text-slate-200">
                Our Location
              </h4>
              <div className="text-sm text-slate-400">
                No 17/3, (Old No 8C), 2nd Floor, Pembroke, Shafee Mohammad Road,
                <br />
                Nungambakkam, Chennai, Tamil Nadu, India, 600006.
              </div>

              <div className="mt-4 text-sm text-slate-400">
                <div>contactus@mylapay.com</div>
                <div className="mt-2">+91 89254 61317</div>
              </div>

              <div className="mt-6 flex items-center gap-4 text-slate-400">
                <a href="#" className="hover:text-white">
                  f
                </a>
                <a href="#" className="hover:text-white">
                  in
                </a>
                <a href="#" className="hover:text-white">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-slate-600">
            <div>Acceptance policy</div>
            <div>Privacy</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
