import * as yup from 'yup'

export const UnidadeAdocaoValidationRequest = yup.object().shape({
    nome: yup.string().required("O Nome é obrigatório").max(256, "O nome deve conter no máximo 255 carcteres"),
    cep: yup.string().required("O cep é obrigatório"),
    telefone: yup.string().required("O telefone é obrigatório"),
    email: yup.string().max(4000, "O email deve conter no máximo 4000 caracteres"),
    descricao: yup.string().max(4000, "A descricao deve conter no máximo 4000 caracteres")
})