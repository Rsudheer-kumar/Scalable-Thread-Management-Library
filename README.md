# Scalable Thread Management Library  
A high-performance C/C++ library for creating, scheduling, synchronizing, and managing **thousands of threads** efficiently.  
Designed for high-performance computing (HPC), servers, data processing systems, and real-time workloads.

---

## 🚀 Overview
Modern applications often need to run **many tasks at the same time**.  
Creating OS threads again and again is slow, unsafe, and wasteful.

This library provides:

- A fast **thread pool**
- Safe **synchronization tools**
- Easy **task submission APIs**
- Efficient **scheduling**
- Clean **shutdown** and resource management

---

## ✨ Key Features

### **Efficient Thread Creation**
- Workers are reused using a pool  
- No repeated OS thread creation overhead  

### **Scalable to Thousands**
- Handles huge numbers of concurrent tasks  
- Designed for HPC and parallel processing  

### **Flexible Task Submission API**
- Submit functions or lambdas easily  
- Futures or callbacks supported  

### **Synchronization Support**
- Mutex  
- Condition variables  
- Semaphores  
- Barriers  

### **Graceful Shutdown**
- Stop task submission  
- Wait for all tasks  
- Clean exit  

### **Configurable Policies**
- Thread count  
- Queue size  
- Scheduling policy  

### **Instrumentation Hooks**
- Optional metrics  
- Throughput and latency monitoring  

---

## 🧱 Library Architecture

### **1. Thread Pool Manager**
- Creates and controls worker threads  
- Grows/shrinks pool dynamically based on load  

### **2. Task Queue(s)**
- Stores tasks waiting to run  
- Supports work-stealing and priority queues  

### **3. Scheduler / Dispatcher**
- Assigns tasks to available workers  
- Balances load across all threads  

### **4. Synchronization Primitives**
- Safe wrappers for mutex, semaphore, condvar, barrier  

### **5. Lifecycle Controller**
- Clean startup and shutdown  
- Resource cleanup and termination handling  

---

## 🧪 API Overview (Simple Examples)

### **Creating a Pool & Submitting Tasks**
```cpp
// Initialize a thread pool with 8 workers
ThreadPool pool(8);

// Submit a simple function
pool.submit(processData);

// Submit a lambda task
pool.submit([]() {
    std::cout << "Task running on thread: "
              << std::this_thread::get_id();
});

```
### **6. Producer–Consumer Example
```
ThreadSafeQueue<int> queue;

// Producer task
pool.submit([&queue]() {
    for (int i = 0; i < 100; i++) {
        queue.push(i);
    }
});

// Consumer tasks
for (int i = 0; i < 4; i++) {
    pool.submit([&queue]() {
        while (auto item = queue.pop()) {
            process(*item);
        }
    });
}
```
### **7. Graceful Shutdown
```
ThreadPool pool(numThreads);
submitWorkItems(pool);

pool.stopAccepting();   // no new work
pool.waitAll();         // wait for current tasks
pool.shutdownGracefully();

```

### 📊 Performance & Scalability

The library is optimized for:
<li>Low latency</li>
<li>High throughput</li>
<li>Minimal synchronization overhead</li>
<li>Near-linear scaling with increasing thread count</li>
Techniques used:
<li>Lock-free queues</li>
<li>Work stealing</li>
<li>Cache optimization</li>
<li>Adaptive thread pool sizing</li>

// Wait for all tasks to finish
pool.waitAll();

### 🧩 Demo Playground

A demo UI (in HTML/JS) allows you to visualize:
<li>Number of worker threads</li>
<li>Number of tasks</li>
<li>Task duration</li>
<li>How tasks are scheduled per worker</li>
<li>(This demo simulates behavior — browser cannot create OS threads.)</li>

### screenshort

Rsudheer-kumar
Scalable-Thread-Management-Library
<p align="center">
  <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154526.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154535.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154542.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154553.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154601.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154607.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154623.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154631.png" width="860" style="margin-right:20px;">
      <img src="https://raw.githubusercontent.com/Rsudheer-kumar/Scalable-Thread-Management-Library/main/Code/Photo/Screenshot 2025-12-11 154638.png" width="860" style="margin-right:20px;">
    
</p>
