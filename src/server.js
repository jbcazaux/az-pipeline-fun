import Koa from 'koa'
import hello from './hello.js'
import pgPool from './pgPool.js'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()
const PORT = 80
const HOST = '0.0.0.0'

const port = process.env.PORT || PORT

router.get('/', async ctx => {
  let client
  try {
    client = await pgPool.connect()
    const clientIP = ctx.request.ip
    await client.query('INSERT INTO visitors (ip, visit_date) VALUES ($1, $2)', [clientIP, new Date()])
  } finally {
    client?.release()
  }
  ctx.body = hello('world')
})

router.get('/visitors', async ctx => {
  let client
  try {
    client = await pgPool.connect()
    const result = await client.query('SELECT ip, visit_date FROM visitors')
    ctx.body = result.rows.map(r => ({ [r.ip]: r.visit_date }))
  } finally {
    client?.release()
  }
})

router.post('/', ctx => {
  ctx.body = 'post !'
})

app.use(router.routes()).use(router.allowedMethods()).listen(port)

console.log(`Running on http://${HOST}:${PORT}`)
