import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { renderFile } from 'ejs'
import path from 'path'

const app = new Hono()

// Static file serving
app.use('/public/*', serveStatic({ root: './' }))

// Middleware to render EJS templates
app.use('*', async (c, next) => {
  c.render = (template: string, data: any = {}) => {
    const templatePath = path.join(process.cwd(), 'views', `${template}.ejs`)
    const html = renderFile(templatePath, data, { async: false })
    return c.html(html as string)
  }
  await next()
})

// Routes
app.get('/', (c) => {
  return c.render('simple', { 
    title: 'Simple Benchmark Page',
    message: 'This is a simple HTML page for basic performance testing.',
    runtime: 'Bun',
    timestamp: new Date().toISOString()
  })
})

app.get('/simple', (c) => {
  return c.render('simple', { 
    title: 'Simple Benchmark Page',
    message: 'This is a simple HTML page for basic performance testing.',
    runtime: 'Bun',
    timestamp: new Date().toISOString()
  })
})

app.get('/complex', (c) => {
  const sampleProducts = [
    { id: 1, name: 'Premium Headphones', price: 299.99, image: '/public/images/feature1.svg', rating: 4.8 },
    { id: 2, name: 'Wireless Mouse', price: 79.99, image: '/public/images/feature1.svg', rating: 4.5 },
    { id: 3, name: 'Mechanical Keyboard', price: 159.99, image: '/public/images/feature1.svg', rating: 4.9 },
    { id: 4, name: 'USB-C Hub', price: 89.99, image: '/public/images/feature1.svg', rating: 4.3 },
    { id: 5, name: 'Laptop Stand', price: 49.99, image: '/public/images/feature1.svg', rating: 4.6 },
    { id: 6, name: 'Webcam HD', price: 129.99, image: '/public/images/feature1.svg', rating: 4.7 }
  ]
  
  const testimonials = [
    { name: 'Sarah Johnson', text: 'Amazing performance and reliability. Highly recommended!', company: 'TechCorp Inc.' },
    { name: 'Mike Chen', text: 'Best solution we\'ve implemented for our web services.', company: 'StartupXYZ' },
    { name: 'Elena Rodriguez', text: 'Outstanding support and incredible speed improvements.', company: 'Digital Agency' }
  ]
  
  return c.render('complex', { 
    title: 'Complex Benchmark Page',
    message: 'This is a complex HTML page with images and data for performance testing.',
    runtime: 'Bun',
    timestamp: new Date().toISOString(),
    products: sampleProducts,
    testimonials: testimonials,
    stats: { users: 12547, orders: 8932, revenue: 284730 }
  })
})

app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.render('user', {
    title: 'User Profile',
    user: {
      id: id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      created: new Date().toISOString()
    }
  })
})

app.get('/api/status', (c) => {
  return c.json({
    status: 'ok',
    runtime: 'Bun',
    framework: 'Hono',
    template: 'EJS',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/data/:count', (c) => {
  const count = parseInt(c.req.param('count')) || 100
  const data = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString()
  }))
  
  return c.json({ data, count: data.length })
})

const port = 3001
console.log(`Bun + Hono server running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}