import { Zap, Scale, Code2, Lock, Power, Sliders, Activity } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Efficient Thread Creation",
    description: "Uses thread pooling to avoid repeated OS thread creation overhead.",
  },
  {
    icon: Scale,
    title: "Scalable to Thousands",
    description: "Designed to handle large numbers of tasks concurrently.",
  },
  {
    icon: Code2,
    title: "Flexible Task Submission API",
    description: "Functions to submit tasks/lambdas to the pool with ease.",
  },
  {
    icon: Lock,
    title: "Synchronization Support",
    description: "Mutex, condition variables, semaphores, and barriers wrapped in a safe API.",
  },
  {
    icon: Power,
    title: "Graceful Shutdown",
    description: "Ability to wait for all tasks to finish and then terminate threads cleanly.",
  },
  {
    icon: Sliders,
    title: "Configurable Policies",
    description: "Thread count, queue size, scheduling policy configurable via parameters.",
  },
  {
    icon: Activity,
    title: "Instrumentation Hooks",
    description: "Optional callbacks or metrics for monitoring throughput and latency.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Key Features</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage threads efficiently at scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
