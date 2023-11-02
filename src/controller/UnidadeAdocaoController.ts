const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

export const unidadeAdocaoController = {
    async listarTodos() {
        try {
            const unidadesAdocao = await prisma.unidadesAdocao.findMany()

            return unidadesAdocao
        } catch (error: any) {
            console.log(error)
        }
    },

    async criar(unidadeAdocao: any, usuario: any) {
        try {
            const unidadeAdocaoCadastrado = await prisma.unidadesAdocao.create({
                data: {
                    ...unidadeAdocao,
                }
            })

            return {
                status: 200,
                body: {
                    message: 'A unidade de adoção foi cadastrada com sucesso',
                    pet: unidadeAdocaoCadastrado
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    },

    async editar(idUnidadeAdocao: Number, unidadeAdocao: any, usuario: any) {
        try {
            const unidadeAdocaoEditada = await prisma.unidadesAdocao.update({
                where: { id: idUnidadeAdocao },
                data: {
                    nome: unidadeAdocao.nome,
                    cep: unidadeAdocao.cep,
                    telefone: unidadeAdocao.telefone,
                    adotado: unidadeAdocao.adotado,
                    idUnidadeAdocao: unidadeAdocao.idUnidadeAdocao
                }
            })

            return {
                status: 200,
                body: {
                    message: 'A unidade de adoção foi editado com sucesso',
                    pet: unidadeAdocaoEditada
                }
            }

        } catch (error: any) {
            console.log(error)
        }
    },

    async buscarPorId(idUnidadeAdocao: Number, usuario: any) {
        try {
            const unidadeAdocaoBuscada = await prisma.unidadesAdocao.findUnique({
                where: { id: idUnidadeAdocao }
            })

            return {
                status: 200,
                body: {
                    pet: unidadeAdocaoBuscada
                }
            }

        } catch (error: any) {
            console.log(error)
        }
    },
}