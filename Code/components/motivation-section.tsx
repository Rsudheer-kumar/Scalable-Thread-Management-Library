import { AlertTriangle, Cog, Target } from "lucide-react"

export function MotivationSection() {
  return (
    <section id="motivation" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Why a Scalable Thread Management Library?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Modern applications demand efficient handling of thousands of concurrent tasks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Modern Application Needs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                HPC, servers, and data processing need thousands of concurrent tasks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Real-time systems require predictable thread behavior
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Microservices demand efficient resource utilization
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-3 rounded-lg bg-destructive/10 w-fit mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Raw OS Thread Challenges</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Overhead of frequent creation/destruction cycles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Complex synchronization (locks, race conditions, deadlocks)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                Difficulty tuning thread counts for different machines
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
              <Cog className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Our Solution</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                Thread pool / worker model for efficient reuse
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                Structured APIs for starting, syncing, and terminating
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                Focus on performance, safety, and scalability
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
