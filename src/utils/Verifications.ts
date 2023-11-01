const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

export const Verifications = {

    async validarSeUsuarioEhAdministrador(cpf: String) {
        const user = await prisma.usuarios.findUnique({
            where: { cpf },
            include: { regraUsuario: true }
        })

        if (!user) {
            return false
        }

        const regra = await prisma.regras.findUnique({
            where: { id: user.regraUsuario[0].idRegra }
        })

        return regra.nome === 'administrador'
    },

}