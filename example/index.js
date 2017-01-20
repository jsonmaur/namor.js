const http = require('http')
const url = require('url')
const namor = require('namor')

const server = http.createServer((req, res) => {
  const { query } = url.parse(req.url, true)

  const payload = JSON.stringify({
    generated_name: namor.generate({
      words: query.words || 2,
      numbers: query.numbers || 2,
      char: query.char,
      manly: query.manly
    })
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
