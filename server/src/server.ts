import express from "express";
import colors from "colors"
import cors, { CorsOptions } from "cors"
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        // console.log( colors.magenta('Conexión exitosa a la base de datos'.toUpperCase()))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la base de datos'.toUpperCase()))
    }
}

connectDB()

// Instancia de express
const server = express()

// Permitir Conexiones CORS
const corsOptions : CorsOptions = {
    origin: function(origin, callback) { 
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Dominio no permitido'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use( express.json() )

server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec)
)

export default server;