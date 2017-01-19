const http = require('http')
const namor = require('../dist')

const server = http.createServer((req, res) => {
  const payload = JSON.stringify({
    generated_name: namor.generate({
      numLen: 2,
      manly: true
    }),
    manly_mode: true,
    trailing_nums: 2
  }, null, 2)

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Content-Length', Buffer.byteLength(payload))

  res.end(payload)
})

const port = process.env.PORT || 8080
const host = process.env.HOST || '0.0.0.0'

server.listen(port, host, () => {
  console.log(`=> running at http://${host}:${port}`)
})
