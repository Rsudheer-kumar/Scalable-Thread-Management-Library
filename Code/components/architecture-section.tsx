import { Database, Layers, Settings, Shield, Power } from "lucide-react"

const architectureBlocks = [
  {
    icon: Layers,
    title: "Thread Pool Manager",
    description: "Creates an initial pool of worker threads. Handles dynamic growth/shrink of pool based on load.",
  },
  {
    icon: Database,
    title: "Task Queue(s)",
    description: "One or more queues that hold units of work. Supports work-stealing or priority queues.",
  },
  {
    icon: Settings,
    title: "Scheduler / Dispatcher",
    description: "Assigns tasks from queues to available worker threads. Ensures load is balanced across threads.",
  },
  {
    icon: Shield,
    title: "Synchronization Primitives",
    description: "Standardized wrappers around mutexes, condition variables, semaphores, and barriers.",
  },
  {
    icon: Power,
    title: "Lifecycle Controller",
    description: "Safe startup and shutdown of the thread pool. Graceful termination and resource cleanup.",
  },
]

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Library Architecture</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A modular design that separates concerns for maximum flexibility and performance.
          </p>
        </div>

        <div className="relative">
          {/* Architecture Diagram */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 400">
              {/* Connection lines */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="oklch(0.45 0.2 270)" opacity="0.5" />
                </marker>
              </defs>
              {/* Horizontal flow lines */}
              <path
                d="M 200 100 L 350 100"
                stroke="oklch(0.45 0.2 270)"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.3"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M 450 100 L 600 100"
                stroke="oklch(0.45 0.2 270)"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.3"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M 200 300 L 350 300"
                stroke="oklch(0.45 0.2 270)"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.3"
                markerEnd="url(#arrowhead)"
              />
              {/* Vertical connections */}
              <path
                d="M 500 150 L 500 250"
                stroke="oklch(0.45 0.2 270)"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.3"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureBlocks.map((block, index) => (
              <div
                key={block.title}
                className={`relative bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all ${
                  index === 4 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <block.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{block.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{block.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
