import { Button } from "@/components/ui/button"
import { Cpu, Zap, Layers } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              A High-Performance Library for Managing <span className="text-primary">Thousands of Threads</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A scalable thread management library that simplifies creation, synchronization, and termination of
              threads, designed for high-performance computing workloads.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#architecture">Explore the Architecture</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent text-accent-foreground hover:bg-accent/10 bg-transparent"
              >
                <a href="#demo">Try the Demo Playground</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <ThreadIllustration />
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Efficient Creation",
              desc: "Thread pooling eliminates repeated OS thread creation overhead",
            },
            {
              icon: Layers,
              title: "Lightweight Synchronization",
              desc: "Safe wrappers around mutexes, semaphores, and barriers",
            },
            { icon: Cpu, title: "Scales to Thousands", desc: "Designed to handle massive concurrent workloads" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThreadIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto">
      {/* Background gradient */}
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.45 0.2 270)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="oklch(0.45 0.2 270)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 55)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.45 0.2 270)" />
          <stop offset="100%" stopColor="oklch(0.35 0.18 270)" />
        </linearGradient>
      </defs>

      {/* Parallel thread lines */}
      {[...Array(12)].map((_, i) => (
        <g key={i}>
          <path
            d={`M 30 ${40 + i * 18} Q 150 ${40 + i * 18 + (i % 2 === 0 ? 10 : -10)}, 250 150`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.4 + (i % 3) * 0.2}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="300;0"
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="0,300;150,150;300,0"
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      ))}

      {/* CPU Icon */}
      <g transform="translate(250, 110)">
        <rect x="0" y="0" width="80" height="80" rx="12" fill="url(#cpuGradient)" />
        {/* CPU pins */}
        {[...Array(4)].map((_, i) => (
          <g key={`pin-top-${i}`}>
            <rect x={15 + i * 15} y="-8" width="6" height="12" rx="2" fill="oklch(0.45 0.2 270)" />
            <rect x={15 + i * 15} y="76" width="6" height="12" rx="2" fill="oklch(0.45 0.2 270)" />
            <rect x="-8" y={15 + i * 15} width="12" height="6" rx="2" fill="oklch(0.45 0.2 270)" />
            <rect x="76" y={15 + i * 15} width="12" height="6" rx="2" fill="oklch(0.45 0.2 270)" />
          </g>
        ))}
        {/* CPU core grid */}
        <g transform="translate(16, 16)">
          {[...Array(4)].map((_, i) => (
            <rect
              key={i}
              x={(i % 2) * 26}
              y={Math.floor(i / 2) * 26}
              width="22"
              height="22"
              rx="4"
              fill="oklch(0.98 0.002 250)"
              opacity="0.9"
            />
          ))}
        </g>
      </g>

      {/* Small thread indicators on the left */}
      {[...Array(6)].map((_, i) => (
        <circle key={`dot-${i}`} cx="20" cy={55 + i * 36} r="6" fill="oklch(0.7 0.18 55)" opacity={0.6 + (i % 2) * 0.3}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}
