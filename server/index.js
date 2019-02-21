import http from 'http'
import ExpressServer from './src/expressServer'

const port = process.env.APP_SERVER_PORT || 8000
const url = process.env.API_HOST || 'http://localhost'

let app = new ExpressServer()
let server = http.createServer(app.expressServer)
server.listen(port, () => console.log('Server running at ' + url + ':' + port))
