import { unidadeAdocaoController } from '../controller/UnidadeAdocaoController'
import ValidationMiddlware from '../middleware/ValidationMiddlware'

module.exports = (app: any) => {
    app.get('/unidades-adocao', async (request: any, response: any) => {
        const unidadeAdocao = await unidadeAdocaoController.listarTodos()

        return response.status(200).json(unidadeAdocao)
    })

    app.get('/unidades-adocao/:id', async (request: any, response: any) => {
        const returnedResponse = await unidadeAdocaoController.buscarPorId(Number(request.params.id), request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.post('/unidades-adocao', ValidationMiddlware, async (request: any, response: any) => {
        const returnedResponse = await unidadeAdocaoController.criar(request.body.unidadeAdocao, request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.put('/unidades-adocao/:id', ValidationMiddlware, async (request: any, response: any) => {
        const returnedResponse = await unidadeAdocaoController.editar(Number(request.params.id), request.body.unidadeAdocao, request.body.usuario)

        return response.status(returnedResponse?.status).json(returnedResponse?.body)
    })
}