import http from 'http'
import ExpressServer from './expressServer'

const port = process.env.APP_SERVER_PORT
const url = process.env.API_HOST

let app = new ExpressServer()
let server = http.createServer(app.expressServer)
server.listen(port, () => console.log(`Server running at ${url}:${port}`))
