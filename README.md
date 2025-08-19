# Node.js vs Bun Performance Comparison

This repository contains two identical applications built with Hono and EJS templates to benchmark performance differences between Node.js and Bun runtimes.

## Applications

### 1. Node.js + Hono + EJS (`node-hono-app/`)
- Runtime: Node.js
- Framework: Hono
- Template Engine: EJS
- Port: 3000

### 2. Bun + Hono + EJS (`bun-hono-app/`)
- Runtime: Bun
- Framework: Hono
- Template Engine: EJS
- Port: 3001

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- Bun (latest version)
- Apache Bench (ab) for benchmarking

### Installation

**Node.js App:**
```bash
cd node-hono-app
npm install
npm start
```

**Bun App:**
```bash
cd bun-hono-app
bun install
bun start
```

## Available Routes

Both applications have identical routes for different benchmark scenarios:

### Template Rendering Routes
- `GET /` - Simple HTML page (minimal template for basic benchmarking)
- `GET /simple` - Same as homepage - simple HTML template
- `GET /complex` - Complex HTML page with images, data, and CSS (realistic web page)
- `GET /users/:id` - User profile page with dynamic data

### API Routes  
- `GET /api/status` - JSON status endpoint (simple JSON response)
- `GET /api/data/:count` - JSON endpoint returning array of generated data (data processing)

## Benchmarking with Apache Bench

### Simple HTML Template Test (Expected: Bun wins)
```bash
# Node.js app - Simple template
ab -n 10000 -c 100 http://localhost:3000/
# or
ab -n 10000 -c 100 http://localhost:3000/simple

# Bun app - Simple template  
ab -n 10000 -c 100 http://localhost:3001/
# or
ab -n 10000 -c 100 http://localhost:3001/simple
```

### Complex HTML Template Test (Expected: Node.js competitive/wins)
```bash
# Node.js app - Complex template with images and data
ab -n 5000 -c 50 http://localhost:3000/complex

# Bun app - Complex template with images and data
ab -n 5000 -c 50 http://localhost:3001/complex
```

### Pure JSON API Test (Expected: Bun wins)
```bash
# Node.js app - Simple JSON response
ab -n 10000 -c 100 http://localhost:3000/api/status

# Bun app - Simple JSON response
ab -n 10000 -c 100 http://localhost:3001/api/status
```

### Data Processing Test (Variable results)
```bash
# Node.js app - Generate and return array data
ab -n 5000 -c 50 http://localhost:3000/api/data/100

# Bun app - Generate and return array data
ab -n 5000 -c 50 http://localhost:3001/api/data/100
```

### User Profile Template Test
```bash
# Node.js app - Dynamic user profile
ab -n 5000 -c 50 http://localhost:3000/users/123

# Bun app - Dynamic user profile
ab -n 5000 -c 50 http://localhost:3001/users/123
```

## Benchmark Parameters Explanation

- `-n 10000`: Total number of requests
- `-c 100`: Number of concurrent requests
- Adjust these values based on your system capabilities

## Expected Metrics

Apache Bench will provide metrics including:
- Requests per second
- Time per request
- Connection times (min/mean/max)
- Transfer rate
- Percentage of requests served within certain time ranges

## Performance Analysis Notes

Based on your testing observations:

### **Bun Advantages:**
- **Simple HTML/JSON responses**: Bun excels with minimal processing overhead
- **Basic template rendering**: Faster for simple EJS templates
- **Pure API endpoints**: Superior performance for JSON responses
- **Connection handling**: Optimized for high-throughput, low-complexity requests

### **Node.js Advantages:**
- **Complex template processing**: Better performance with heavy EJS rendering
- **Data manipulation**: V8's mature optimization for complex JavaScript operations
- **Memory management**: Superior garbage collection for complex object operations
- **String processing**: More efficient with extensive string manipulation

### **Recommendation:**
- Use **Bun** for: Simple APIs, static sites, basic template rendering
- Use **Node.js** for: Complex web applications, heavy data processing, mature application logic

## Testing Notes

- Both applications use identical code structure and logic
- The only difference is the runtime (Node.js vs Bun) 
- EJS templates are identical for fair comparison
- Routes handle similar computational loads
- Make sure to warm up the applications with a few requests before running benchmarks
- Test multiple times and average results for accuracy