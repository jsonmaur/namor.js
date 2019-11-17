const http = require("http")
const url = require("url")
const namor = require("namor")

const server = http.createServer((req, res) => {
	const { query } = url.parse(req.url, true)

	const payload = JSON.stringify(
		{
			generated_name: namor.generate({
				words: query.words,
				saltLength: query.saltLength,
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
const host = process.env.HOST || "0.0.0.0"

server.listen(port, host, () => {
	console.log(`=> running at http://${host}:${port}`)
})
