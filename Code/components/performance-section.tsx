"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const throughputData = [
  { threads: 1, throughput: 1200 },
  { threads: 2, throughput: 2300 },
  { threads: 4, throughput: 4400 },
  { threads: 8, throughput: 8200 },
  { threads: 16, throughput: 14500 },
  { threads: 32, throughput: 24000 },
  { threads: 64, throughput: 38000 },
]

const latencyData = [
  { workload: "Light", pooled: 0.5, raw: 2.1 },
  { workload: "Medium", pooled: 1.2, raw: 4.8 },
  { workload: "Heavy", pooled: 2.8, raw: 12.5 },
  { workload: "Extreme", pooled: 5.2, raw: 28.3 },
]

export function PerformanceSection() {
  return (
    <section id="performance" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Performance & Scalability</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Designed from the ground up for high-performance computing workloads.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Throughput Chart */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Throughput vs Thread Count</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tasks per second scales near-linearly with thread count.
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={throughputData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 260)" />
                  <XAxis
                    dataKey="threads"
                    tick={{ fontSize: 12 }}
                    stroke="oklch(0.45 0.02 260)"
                    label={{ value: "Threads", position: "bottom", offset: -5 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="oklch(0.45 0.02 260)"
                    label={{ value: "Tasks/sec", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 260)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="oklch(0.45 0.2 270)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.45 0.2 270)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latency Chart */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Latency Comparison</h3>
            <p className="text-sm text-muted-foreground mb-6">Thread pool vs raw thread creation overhead (ms).</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 260)" />
                  <XAxis dataKey="workload" tick={{ fontSize: 12 }} stroke="oklch(0.45 0.02 260)" />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="oklch(0.45 0.02 260)"
                    label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 260)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="pooled" name="Thread Pool" fill="oklch(0.45 0.2 270)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="raw" name="Raw Threads" fill="oklch(0.7 0.18 55)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Design Techniques */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Design Techniques for Performance</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Lock-Free Queues", desc: "Minimize contention with CAS operations" },
              { title: "Work Stealing", desc: "Per-thread local queues with stealing" },
              { title: "Cache Optimization", desc: "Avoid false sharing and cache misses" },
              { title: "Adaptive Sizing", desc: "Dynamic pool resizing based on load" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          * Charts show illustrative example results from test scenarios
        </p>
      </div>
    </section>
  )
}
