const http = require("http")
const url = require("url")
const namor = require("namor")

const maxWords = 4
const maxSaltLength = 20

const server = http.createServer((req, res) => {
	const { query } = url.parse(req.url, true)

	const payload = JSON.stringify(
		{
			generated_name: namor.generate({
				words: Math.min(query.words, maxWords),
				saltLength: Math.min(query.saltLength, maxSaltLength),
				saltType: query.saltType,
				separator: query.separator,
				subset: query.subset,
			}),
		},
		null,
		2,
	)

	res.setHeader("Content-Type", "application/json")
	res.setHeader("Content-Length", Buffer.byteLength(payload))
	res.setHeader("Access-Control-Allow-Origin", "*")

	res.end(payload)
})

const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"

server.listen(port, host, () => {
	console.log(`=> running at http://${host}:${port}`)
})
