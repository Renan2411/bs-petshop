const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

export default async (request: any, response: any, next: any) => {
    const usuario = request.body.usuario

    if (!usuario || !usuario.cpf) {
        return response.status(406).json({
            message: "Ausência do cpf do usuário para completar a ação!"
        })
    }

    const user = await prisma.usuarios.findUnique({
        where: { cpf: usuario.cpf },
        include: { regraUsuario: true }
    })

    console.log(user)

    if (!user) {
        return response.status(400).json({
            message: "Usuário não encontrado!"
        })
    }

    if (!user.regraUsuario[0].idRegra) {
        return response.status(400).json({
            message:  "Usuário não possui a permissão necessária para completar a ação!"
        })
    }

    const regra = await prisma.regras.findUnique({
        where: { id: user.regraUsuario[0].idRegra }
    })

    if (regra.nome !== 'administrador') {
        return response.status(400).json({
            message: "Usuário não possui a permissão necessária para completar a ação!"
        })
    }

    next()
}