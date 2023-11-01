import { petController } from '../controller/PetController'

module.exports = (app: any) => {
    app.get('/pets', async (request: any, response: any) => {
        const pets = await petController.listarTodos()

        return response.status(200).json(pets)
    })

    app.get('/pets/nao-adotados', async (request: any, response: any) => {
        const pets = await petController.listarNaoAdotados()

        return response.status(200).json(pets)
    })

    app.get('/pets/:id', async (request: any, response: any) => {
        const returnedResponse = await petController.buscarPorId(Number(request.params.id), request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.post('/pets', async (request: any, response: any) => {
        const returnedResponse = await petController.criar(request.body.pet, request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.put('/pets/:id', async (request: any, response: any) => {
        const returnedResponse = await petController.editar(Number(request.params.id), request.body.pet, request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })
}