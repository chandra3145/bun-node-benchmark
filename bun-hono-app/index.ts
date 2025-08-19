import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { renderFile } from 'ejs'

import createApp from '../shared/app.mjs'

const { app, runtime } = createApp({ Hono, serveStatic, renderFile });

const port = 8080
console.log(`${runtime} + Hono server running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}