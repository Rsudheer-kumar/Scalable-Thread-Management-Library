const codeExamples = [
  {
    title: "Creating a Pool & Submitting Tasks",
    code: `// Initialize a thread pool with 8 workers
ThreadPool pool(8);

// Submit a simple function
pool.submit(processData);

// Submit a lambda task
pool.submit([]() {
    std::cout << "Task running on thread: " 
              << std::this_thread::get_id();
});

// Wait for all tasks to complete
pool.waitAll();`,
  },
  {
    title: "Producer-Consumer Pattern",
    code: `// Shared queue with synchronization
ThreadSafeQueue<int> queue;

// Producer task
pool.submit([&queue]() {
    for (int i = 0; i < 100; ++i) {
        queue.push(i);
    }
});

// Consumer tasks
for (int i = 0; i < 4; ++i) {
    pool.submit([&queue]() {
        while (auto item = queue.pop()) {
            process(*item);
        }
    });
}`,
  },
  {
    title: "Graceful Shutdown",
    code: `// Create pool and submit work
ThreadPool pool(numThreads);
submitWorkItems(pool);

// Signal no more work will be added
pool.stopAcceptingTasks();

// Wait for in-flight tasks to complete
pool.waitAll();

// Shutdown gracefully
pool.shutdownGracefully();

// Resources are cleaned up automatically`,
  },
]

export function ApiSection() {
  return (
    <section id="api" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">API Overview</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Clean, intuitive APIs designed for developer productivity.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {codeExamples.map((example) => (
            <div key={example.title} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/50">
                <h3 className="font-semibold text-sm text-foreground">{example.title}</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
