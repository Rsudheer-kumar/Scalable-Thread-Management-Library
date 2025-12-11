"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, RotateCcw } from "lucide-react"

type SyncMode = "none" | "lock" | "atomic"

type Task = {
  id: number
  worker: number
  startTime: number
  finishTime: number
  duration: number
  completed: boolean
}

type SimulationResult = {
  tasks: Task[]
  totalTimeMs: number
  tasksPerSecond: number
}

const BASE_DURATIONS: Record<"short" | "medium" | "long", number> = {
  short: 100,
  medium: 400,
  long: 900,
}

const LOCK_COST_MS = 20
const ATOMIC_COST_MS = 5

function simulateThreadPool({
  workerThreads,
  numTasks,
  taskDuration,
  syncMode,
}: {
  workerThreads: number
  numTasks: number
  taskDuration: "short" | "medium" | "long"
  syncMode: SyncMode
}): SimulationResult {
  const workers = Math.max(1, workerThreads)
  const tasksCount = Math.max(0, numTasks)
  const baseDuration = BASE_DURATIONS[taskDuration]

  const workerAvailableAt = Array(workers).fill(0)
  let lockAvailableAt = 0

  const tasks: Task[] = []

  for (let i = 0; i < tasksCount; i++) {
    let workerIndex = 0
    for (let w = 1; w < workers; w++) {
      if (workerAvailableAt[w] < workerAvailableAt[workerIndex]) {
        workerIndex = w
      }
    }

    const assignTime = workerAvailableAt[workerIndex]
    let finishTime: number

    if (syncMode === "lock") {
      const enterTime = Math.max(assignTime, lockAvailableAt)
      lockAvailableAt = enterTime + LOCK_COST_MS
      finishTime = enterTime + LOCK_COST_MS + baseDuration
    } else if (syncMode === "atomic") {
      finishTime = assignTime + baseDuration + ATOMIC_COST_MS
    } else {
      finishTime = assignTime + baseDuration
    }

    const duration = finishTime - assignTime
    workerAvailableAt[workerIndex] = finishTime

    tasks.push({
      id: i,
      worker: workerIndex,
      startTime: assignTime,
      finishTime,
      duration,
      completed: false,
    })
  }

  const totalTimeMs = workerAvailableAt.length ? Math.max(...workerAvailableAt) : 0
  const tasksPerSecond = totalTimeMs > 0 ? tasksCount / (totalTimeMs / 1000) : 0

  return {
    tasks,
    totalTimeMs,
    tasksPerSecond,
  }
}

export function DemoSection() {
  const [numWorkers, setNumWorkers] = useState(4)
  const [numTasks, setNumTasks] = useState(20)
  const [taskDuration, setTaskDuration] = useState<"short" | "medium" | "long">("medium")
  const [syncMode, setSyncMode] = useState<SyncMode>("none")
  const [isRunning, setIsRunning] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [metrics, setMetrics] = useState({ completed: 0, totalTime: 0, tasksPerSecond: 0 })
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const simulationDurationRef = useRef<number>(0)
  const timeScaleRef = useRef<number>(1)

  const runSimulation = useCallback(() => {
    const { tasks: simulatedTasks, totalTimeMs, tasksPerSecond } = simulateThreadPool({
      workerThreads: numWorkers,
      numTasks,
      taskDuration,
      syncMode,
    })

    // Map the virtual simulation time onto a fixed display duration for smooth animations.
    const displayDurationMs = Math.min(Math.max(totalTimeMs, 1500), 7000)
    const timeScale = totalTimeMs > 0 ? totalTimeMs / displayDurationMs : 1

    setIsRunning(true)
    startTimeRef.current = Date.now()
    simulationDurationRef.current = totalTimeMs
    timeScaleRef.current = timeScale

    setTasks(simulatedTasks.map((task) => ({ ...task, completed: false })))
    setMetrics({ completed: 0, totalTime: 0, tasksPerSecond: 0 })

    const animate = () => {
      const elapsedReal = Date.now() - startTimeRef.current
      const elapsedVirtual = elapsedReal * timeScaleRef.current
      const clampedVirtual = Math.min(elapsedVirtual, simulationDurationRef.current)

      setTasks((prev: Task[]) => {
        const updated = prev.map((task: Task) => ({
          ...task,
          completed: clampedVirtual >= task.finishTime,
        }))

        const completedCount = updated.filter((t) => t.completed).length
        const totalTimeSeconds = clampedVirtual / 1000

        setMetrics({
          completed: completedCount,
          totalTime: Math.round(totalTimeSeconds * 100) / 100,
          tasksPerSecond:
            totalTimeSeconds > 0 ? Math.round((completedCount / totalTimeSeconds) * 10) / 10 : 0,
        })

        return updated
      })

      if (clampedVirtual < simulationDurationRef.current) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setMetrics({
          completed: simulatedTasks.length,
          totalTime: Math.round((simulationDurationRef.current / 1000) * 100) / 100,
          tasksPerSecond: Math.round(tasksPerSecond * 10) / 10,
        })
        setIsRunning(false)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [numWorkers, numTasks, taskDuration, syncMode])

  const resetSimulation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsRunning(false)
    setTasks([])
    setMetrics({ completed: 0, totalTime: 0, tasksPerSecond: 0 })
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Interactive Demo Playground</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Visualize how the thread pool manages tasks across multiple workers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm space-y-6">
            <h3 className="font-semibold text-foreground">Configuration</h3>

            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Worker Threads: {numWorkers}</Label>
              <Slider
                value={[numWorkers]}
                onValueChange={(v: number[]) => setNumWorkers(v[0])}
                min={1}
                max={16}
                step={1}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Number of Tasks: {numTasks}</Label>
              <Slider
                value={[numTasks]}
                onValueChange={(v: number[]) => setNumTasks(v[0])}
                min={5}
                max={100}
                step={5}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Task Duration</Label>
              <Select
                value={taskDuration}
                onValueChange={(v: string) => setTaskDuration(v as typeof taskDuration)}
                disabled={isRunning}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (~200ms)</SelectItem>
                  <SelectItem value="medium">Medium (~500ms)</SelectItem>
                  <SelectItem value="long">Long (~1000ms)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground">Synchronization Mode</Label>
              <Select value={syncMode} onValueChange={(v: string) => setSyncMode(v as SyncMode)} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Shared Data</SelectItem>
                  <SelectItem value="lock">Shared Counter (Lock)</SelectItem>
                  <SelectItem value="atomic">Shared Counter (Atomic)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={runSimulation} disabled={isRunning} className="flex-1 bg-primary hover:bg-primary/90">
                <Play className="w-4 h-4 mr-2" />
                Run
              </Button>
              <Button onClick={resetSimulation} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Thread Visualization</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Each row represents a worker thread. Blocks show tasks being processed.
            </p>

            <div className="space-y-2 mb-6 min-h-[200px]">
              {Array.from({ length: numWorkers }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 shrink-0">Worker {i + 1}</span>
                  <div className="flex-1 h-8 bg-muted rounded-md relative overflow-hidden">
                    {tasks
                      .filter((t) => t.worker === i)
                      .map((task) => {
                        const elapsedReal = Date.now() - startTimeRef.current
                        const elapsedVirtual = elapsedReal * timeScaleRef.current
                        const isActive = elapsedVirtual >= task.startTime && elapsedVirtual < task.finishTime
                        const progress = task.completed
                          ? 100
                          : isActive
                            ? ((elapsedVirtual - task.startTime) / task.duration) * 100
                            : 0

                        return (
                          <div
                            key={task.id}
                            className={`absolute top-1 bottom-1 rounded transition-all ${
                              task.completed ? "bg-primary" : isActive ? "bg-accent" : "bg-muted-foreground/20"
                            }`}
                            style={{
                              left: `${
                                simulationDurationRef.current > 0
                                  ? (task.startTime / simulationDurationRef.current) * 80
                                  : 0
                              }%`,
                              width: `${
                                simulationDurationRef.current > 0
                                  ? Math.max((task.duration / simulationDurationRef.current) * 80 - 1, 3)
                                  : Math.max(80 / numTasks - 1, 3)
                              }%`,
                              opacity: task.completed ? 1 : isActive ? 0.8 : 0.3,
                            }}
                          >
                            {isActive && (
                              <div
                                className="h-full bg-accent-foreground/20 rounded"
                                style={{ width: `${progress}%` }}
                              />
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{metrics.completed}</p>
                <p className="text-xs text-muted-foreground">Tasks Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{metrics.totalTime}s</p>
                <p className="text-xs text-muted-foreground">Total Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{metrics.tasksPerSecond}</p>
                <p className="text-xs text-muted-foreground">Tasks/Second</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This is a conceptual visualization of the thread library in action, not actual OS-level threads.
        </p>
      </div>
    </section>
  )
}
