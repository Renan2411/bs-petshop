import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.usuarios.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            nome: 'Admin',
            cpf: '53489528000',
            telefone: '67984672888',
            email: 'admin@gmail.com',
            endereco: 'Dentro do Sistema',
        }
    })

    const regraAdministrador = await prisma.regras.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nome: 'administrador',
        }
    })

    const usuarioRegra = await prisma.regra_Usuario.upsert({
        where: { id: 1 },
        update: {},
        create: {
            idUsuario: 1, idRegra: 1
        }
    })
    console.log({ usuarioRegra, regraAdministrador, admin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })