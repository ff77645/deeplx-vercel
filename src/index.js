import { Hono } from 'hono'
import { query } from '@ifyour/deeplx'
import { serve } from '@hono/node-server'

const app = new Hono()

app
  .get('/', (c) => c.redirect('/translate'))
  .get('/translate', (c) => c.text('Please use POST method :)'))
  .post('/translate', async (c) => {
    const params = await c.req.json().catch(() => ({}))
    const result = await query(params)
    return c.json(result, result.code)
  })

serve(app)
