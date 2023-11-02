import express from "express"
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const app = express();

const PORT = 5050;

app.use(express.json())

require("./routes/PetsRoutes")(app)
require("./routes/UnidadeAdocaoRoutes")(app)
require("./routes/IntencaoAdocaoRoutes")(app)

app.get('/', (req, res) => {
    res.send("Olá, mundo");
})

app.get('/users', async (rer, res) => {
    const usuarios = await prisma.usuarios.findUnique({
        where: {
            id: 1
        },
        include:{
            regraUsuario: true
        }
    })

    console.log(usuarios)

    res.status(200).json(usuarios)
})

app.listen(PORT, () => {
    console.log("Servidor Rodando")
})