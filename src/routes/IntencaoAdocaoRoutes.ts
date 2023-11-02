import { intencaoAdocaoController } from "../controller/IntencaoAdocaoController";
import ValidationMiddlware from "../middleware/ValidationMiddlware";

module.exports = (app: any) => {

    app.get('/itencoes-adocao', async (req: any, res: any) => {

        const returnedResponse = await intencaoAdocaoController.buscarIntencoesEmAnalise()

        return res.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.get('/itencoes-adocao/pet/:id', async (req: any, res: any) => {
        const returnedResponse = await intencaoAdocaoController.buscarItencoesPorIdPet(Number(req.params.id))

        return res.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.post('/itencoes-adocao/pet/:id', async (req: any, res: any) => {
        const returnedResponse = await intencaoAdocaoController.criar(Number(req.params.id), req.body.usuario)

        return res.status(returnedResponse?.status).json(returnedResponse?.body)
    })

    app.post('/itencoes-adocao/aceitar/:id', ValidationMiddlware, async (req: any,  res: any) => {
        const returnedResponse = await intencaoAdocaoController.aceitarIntencaoAdocao(Number(req.params.id))

        return res.status(returnedResponse?.status).json(returnedResponse?.body)
    })

}