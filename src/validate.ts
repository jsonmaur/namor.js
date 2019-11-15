import data from "./_data"

interface Options {
	reserved?: boolean
}

export default function(name: string, opts: Options = {}): boolean {
	/* Validate against a subdomain regexp */
	const result = /^[\w](?:[\w-]{0,63}[\w])?$/.test(name)

	/* Compare against a list of reserved subdomains */
	if (opts.reserved) {
		return result && data.reserved.indexOf(name) === -1
	}

	return result
}
