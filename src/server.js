'use strict'
import Koa from 'koa'
import hello from './hello.js'

const app = new Koa()
const PORT = 80
const HOST = '0.0.0.0'

const port = process.env.PORT || PORT

app.use(async ctx => {
  ctx.body = hello('world')
})

app.listen(port)

console.log(`Running on http://${HOST}:${PORT}`)
