const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

import { Verifications } from "../utils/Verifications"

export const petController = {
    async listarTodos() {
        try {
            const pets = await prisma.pet.findMany({
                include: { unidadeAdocao: true }
            })

            return { pets }
        } catch (error: any) {
            console.log(error)
        }
    },

    async listarNaoAdotados() {
        try {
            const pets = await prisma.pet.findMany({
                where: { adotado: false },
                include: { unidadeAdocao: true }
            })

            return { pets }
        } catch (error: any) {
            console.log(error)
        }
    },

    async criar(pet: any, usuario: any) {
        try {
            if (!await Verifications.validarSeUsuarioEhAdministrador(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

            const petCadastrado = await prisma.pet.create({
                data: {
                    ...pet,
                    adotado: false
                }
            })

            return {
                status: 200,
                body: {
                    message: 'O Pet foi cadastrado com sucesso',
                    pet: petCadastrado
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    },

    async editar(idPet: Number, pet: any, usuario: any) {
        try {
            if (!await Verifications.validarSeUsuarioEhAdministrador(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

            const petEditado = await prisma.pet.update({
                where: { id: idPet },
                data: {
                    nome: pet.nome,
                    idade: pet.idade,
                    biografia: pet.biografia,
                    adotado: pet.adotado,
                    idUnidadeAdocao: pet.idUnidadeAdocao
                }
            })

            return {
                status: 200,
                body: {
                    message: 'O Pet foi editado com sucesso',
                    pet: petEditado
                }
            }

        } catch (error: any) {
            console.log(error)
        }
    },

    async buscarPorId(idPet: Number, usuario: any) {
        try {
            if (!await Verifications.validarSeUsuarioEhAdministrador(usuario.cpf)) {
                return {
                    status: 403,
                    body: {
                        message: 'O usuário não tem permissão necessária para completar a ação'
                    }
                }
            }

            const petBuscado = await prisma.pet.findUnique({
                where: { id: idPet }
            })

            return {
                status: 200,
                body: {
                    pet: petBuscado
                }
            }

        } catch (error: any) {
            console.log(error)
        }
    },



    async verificarSeEhAdotado(idPet: Number) {
        try {
            const pet = await prisma.pet.findUnique({
                where: { id: idPet }
            })

            return pet.adotado === true
        } catch (error: any) {
            console.log(error)
        }
    }
}