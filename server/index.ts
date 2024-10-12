import express from 'express'

// Local Imports
import config from './config.js'
import alertRouter from './routers/alertRouter.js'
import poisRouter from './routers/guiRouter.js'

const PORT = config.serverPort ?? 8080

const app = express()

app.use(express.static('server/public'))
app.use([ alertRouter, poisRouter ])

app.listen(PORT, () => { console.log(`Server Running on Port ${PORT}`) })
