const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export const UserController = {
    async criar(usuario: any) {
        try {

            const usuarioCriado = await prisma.usuarios.create({
                data: usuario
            })

            return usuarioCriado


        } catch (error: any) {
            console.log(error)
        }
    },

    async buscarPorCPF(cpf: String) {
        try {
            const usuario = await prisma.usuarios.findUnique({
                where: { cpf }
            })

            return usuario

        } catch (error: any) {
            console.log(error)
        }
    }
}
