const express = require('express')
const PrestamosRouter = require('./routes/Prestamos')
const clienteRouter = require('./routes/Cliente')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            prestamos: "/api/v1/prestamos",
            cliente: "/api/v1/cliente"
            
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        
       
       this.app.use(this.paths.prestamos, PrestamosRouter)
       this.app.use(this.paths.cliente, clienteRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server
