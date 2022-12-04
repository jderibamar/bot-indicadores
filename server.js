const express = require('express')
const app = express()
const path = require('path')
const nomeApp = process.env.npm_package_name
// const cors = require('cors')
const port = process.env.PORT || 3000
// app.use(cors())
// const client = require('client.io-client')

// Routing
// app.use(express.static(path.join(__dirname + '/dist/ang-slide-show')) )
app.use(express.static(`${__dirname}/dist/${nomeApp}`))
app.get('/*', (req, res) =>
{
    res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`))
    // res.sendFile(__dirname + '/dist/ang-slide-show/index.html')
})

app.listen(port, () => { console.log('Servidor ativo na porta %d', port) })