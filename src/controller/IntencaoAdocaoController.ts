const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

import { petController } from './PetController'
import { UserController } from './UserController'

export const intencaoAdocaoController = {

    async buscarIntencoesEmAnalise() {
        try {

            const itencoesAdocao = await prisma.intencaoAdocoes.findMany({
                where: { status: "EM_ANALISE" },
                include: { pet: true, usuario: true }
            })

            return {
                status: 200,
                body: itencoesAdocao
            }

        } catch (error: any) {
            console.log(error)
        }
    },

    async buscarItencoesPorIdPet(idPet: Number) {
        try {
            const itencoesAdocao = await prisma.intencaoAdocoes.findMany({
                where: { idPet },
                include: { usuario: true, pet: true }
            })

            return {
                status: 200,
                body: itencoesAdocao
            }

        } catch (error: any) {
            console.log(error)
        }
    },

    async criar(idPet: Number, usuario: any) {
        try {
            let usuarioBuscado = await UserController.buscarPorCPF(usuario.cpf);


            if (!usuarioBuscado) {
                usuarioBuscado = await UserController.criar(usuario)
            }


            if (await petController.verificarSeEhAdotado(idPet)) {
                return {
                    status: 406,
                    body: {
                        message: 'A intenção de Adoção não foi registrada pois o pet já foi adotado',
                    }
                }
            }

            const itencaoAdocao = await prisma.intencaoAdocoes.create({ data: { idPet, idUsuario: usuarioBuscado.id } })

            return {
                status: 200,
                body: {
                    message: 'A intenção de Adoção foi registrada com sucesso',
                    itencaoAdocao
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    },

    async aceitarIntencaoAdocao(idIntencao: Number) {
        try {
            let intencaoAdocao = await prisma.intencaoAdocoes.findUnique({
                where: { id: idIntencao }
            })

            intencaoAdocao = await prisma.intencaoAdocoes.update({
                where: { id: idIntencao },
                data: {
                    idPet: intencaoAdocao.idPet,
                    idUsuario: intencaoAdocao.idUsuario,
                    status: "ACEITA",
                }
            })


            const itencoesAdocao = await prisma.intencaoAdocoes.findMany({
                where: { idPet: intencaoAdocao.idPet, status: 'EM_ANALISE' }
            })

            itencoesAdocao.map(async (intencao: any) => {
                await prisma.intencaoAdocoes.update({
                    where: { id: intencao.id },
                    data: {
                        idPet: intencao.idPet,
                        idUsuario: intencao.idUsuario,
                        status: 'RECUSADA'
                    }
                })
            })

            return {
                body: {
                    intencaoAdocao
                },
                status: 200,
            }

        } catch (error: any) {
            console.log(error)
        }
    },

    async recusarIntencaoAdocao(idPet: Number, idUsuario: Number, usuario: any) {
        try {

            const itencaoAdocao = prisma.intencaoAdocao.update({
                where: { idPet, idUsuario },
                data: {
                    status: "RECUSADA",
                }
            })

            return {
                message: "Itenção de Adoção Recusada com sucesso!!",
                status: 200,
            }

        } catch (error: any) {
            console.log(error)
        }
    },

}