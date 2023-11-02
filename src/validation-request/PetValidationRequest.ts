import * as yup from 'yup'

export const PetValidationRequest = yup.object().shape({
    nome: yup.string().required("O Nome é obrigatório").max(256, "O nome deve conter no máximo 255 carcteres"),
    idade: yup.number().required("A idade é obrigatória"),
    biografia: yup.string().max(4000, "A biografia deve conter no máximo 4000 caracteres")
})