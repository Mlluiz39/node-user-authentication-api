import express from 'express'
import statusRoute from '@/routes/status.route'
import usersRoute from '@/routes/users.route'
import errorHandler from './middleware/error-handler.middleware'

//Crianção do servidor
const app = express()
const port = process.env.PORT || 3000

// Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configurações das rotas
app.use(statusRoute)
app.use(usersRoute)

// Configurações de erro
app.use(errorHandler)

//Inicia o servidor
app.listen(port, () => {
  console.log(`Back-end started in port:${port}`)
})
