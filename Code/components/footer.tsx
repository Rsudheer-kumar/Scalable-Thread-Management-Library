import { Github, FileText, Home } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#api"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Documentation
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
            This website presents an academic project on scalable thread management for high-performance computing
            applications.
          </p>
        </div>
      </div>
    </footer>
  )
}
