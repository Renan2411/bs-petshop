const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

import { petController } from './PetController'
import { Verifications } from "../utils/Verifications"

export const intencaoAdocaoController = {

    async buscarIntencoesEmAnalise(usuario: any) {
        try {

            const itencoesAdocao = prisma.itencaoAdocao.findMany({
                where: { status: "EM_ANALISE" }
            })

            return itencoesAdocao

        } catch (error: any) {
            console.log(error)
        }
    },

    async buscarItencoesPorIdPet(idPet: Number, usuario: any) {

        try {
            const itencoesAdocao = prisma.itencaoAdocao.findMany({
                where: { idPet }
            })

            return itencoesAdocao
        } catch (error: any) {
            console.log(error)
        }

    },

    async criar(idPet: Number, idUsuario: Number) {
        try {

            const itencaoAdocao = await prisma.intencaoAdocao.create({ idPet, idUsuario })

            if (await petController.verificarSeEhAdotado(idPet)) {
                return {
                    status: 406,
                    body: {
                        message: 'A intenção de Adoção não foi registrada pois o pet já foi adotado',
                        itencaoAdocao
                    }
                }
            }

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

    async aceitarIntencaoAdocao(idPet: Number, idUsuario: Number, usuario: any) {

        try {

            const itencaoAdocao = prisma.intencaoAdocao.update({
                where: { idPet, idUsuario },
                data: {
                    status: "ACEITA",
                }
            })


            const itencoesAdocao = await prisma.itencaoAdocao.findMany({
                where: { idPet, status: 'EM_ANALISE' }
            })

            itencaoAdocao.map(async (intencao: any) => {
                await prisma.itencaoAdocao.update({
                    where: { id: intencao.id },
                    data: {
                        status: 'RECUSADA'
                    }
                })
            })

            return {
                message: "Itenção de Adoção Aceita com sucesso!!",
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
                message: "Itenção de Adoção Aceita com sucesso!!",
                status: 200,
            }

        } catch (error: any) {
            console.log(error)
        }
    },

}