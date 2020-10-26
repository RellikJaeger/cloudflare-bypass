const http = require('http')
const net = require('net')
const fs = require('fs')
const ChromeLauncher = require('chrome-launcher')
const log = require('./logging')

class CaptchaHarvester {

	/**
	 * Creates a new instance of the harvester
	 * @param url {URL} The website Url
	 * @param sitekey {string} The website sitekey
	 * @param userAgent {string} The user agent
	 * @param port {int} The response server port
	 */
	constructor(url, sitekey, userAgent, port = 7777) {
		this._url = url
		this._sitekey = sitekey
		this._port = port
		this._userAgent = userAgent
		this._server = http.createServer(this.handleRequest.bind(this))
			.on('connect', this.handleConnect.bind(this))
			.on('error', (err) => log.error('Failed handling request.', err))
			.listen(port)

		this._result = false
	}

	handleConnect(req, clientSocket, head) {
		clientSocket.on('error', () => clientSocket.end())

		const {port, hostname} = new URL(`http://${req.url}`)
		const serverSocket = net.connect(port || 80, hostname, () => {
			clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
			serverSocket.write(head)
			serverSocket.pipe(clientSocket)
			clientSocket.pipe(serverSocket)
		}).on('error', (err) => {
			log.error('Failed proxying HTTPS request.', err)
			clientSocket.end()
		})
	}

	handleRequest(req, res) {
		req.on('error', () => {
			res.statusCode = 400
			res.end()
		})
		res.on('error', (err) => {
			log.error('Failed sending response.', err)
		})

		const reqUrl = new URL(req.url)
		if (reqUrl.hostname === this._url.hostname && reqUrl.pathname === '/') {
			let htmlBody = fs.readFileSync('./harvester-body.html').toString()
			htmlBody = htmlBody.replace('{{SITEKEY}}', this._sitekey)

			res.setHeader('Content-Type', 'text/html')
			res.writeHead(200)
			res.end(htmlBody)
		} else if (reqUrl.hostname === 'captcha-result' && req.method === 'POST') {
			let token = ''
			req.on('data', (data) => token += data)
			req.on('end', () => {
				this._result = token

				res.statusCode = 200
				res.end()
			})
		} else {
			res.statusCode = 404
			res.end()
		}
	}

	/**
	 * Solves the captcha by opening a Chrome instance.
	 * @returns {Promise<string>} The promise resolving to the hCaptcha result
	 */
	async solveCaptcha() {
		if (!this._server)
			throw new Error('Cannot reuse instance of CaptchaHarvester.')

		const chrome = await ChromeLauncher.launch({
			startingUrl: this._url.toString().replace('https:', 'http:'),
			chromeFlags: [`--proxy-server=http://127.0.0.1:${this._port}`]
		})

		log.info('Please solve the captcha in the browser window.')

		while (!this._result) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}

		await chrome.kill()
		this._server.close()
		this._server = null

		return this._result
	}
}

module.exports = CaptchaHarvester