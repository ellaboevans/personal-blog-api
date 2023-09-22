const http = require('http')
const connectionDB = require('./utils/db')
const createServer = require('./utils/server')

//Database Connection
connectionDB()

//Server Initialization
const app = createServer()

//Server Listening on port
let port =  3500
http.createServer(app).listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
