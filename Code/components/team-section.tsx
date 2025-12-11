import { BookOpen, Cpu, Code, User, GraduationCap } from "lucide-react"

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Project & Team</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            An academic exploration of scalable thread management for high-performance computing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-muted-foreground">Project Title</h3>
            <p className="text-foreground mt-1">Scalable Thread Management Library</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-muted-foreground">Domain</h3>
            <p className="text-foreground mt-1">Operating Systems / High-Performance Computing</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-muted-foreground">Technologies</h3>
            <p className="text-foreground mt-1">C/C++, POSIX Threads, CMake</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="p-2 rounded-lg bg-accent/10 w-fit mb-4">
              <User className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-sm text-muted-foreground">Student</h3>
            <p className="text-foreground mt-1">[Your Name Here]</p>
          </div>
        </div>

        <div className="mt-8 bg-card rounded-xl p-6 border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground">Faculty Guide</h3>
            <p className="text-foreground">[Faculty Name & Department]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
