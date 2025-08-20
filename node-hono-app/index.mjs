import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'
import ejs from 'ejs'

import createApp from '../shared/app.mjs'

const { app, runtime } = createApp({ Hono, serveStatic, ejs });

const port = 8081
console.log(`${runtime} + Hono server running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
});