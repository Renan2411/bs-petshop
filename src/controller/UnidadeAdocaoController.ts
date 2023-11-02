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
            if (!await this.validarSeUsuarioEhAdministrado(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

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
            if (!await this.validarSeUsuarioEhAdministrado(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

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
            if (!await this.validarSeUsuarioEhAdministrado(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

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

    async validarSeUsuarioEhAdministrado(cpf: String) {
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
    }
}