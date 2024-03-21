import * as yup from "yup";

export const registerFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  birthdate: yup.string().required("Data de nascimento é obrigatória"),
  cel: yup.string().required("Telefone com DDD é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  password: yup.string().required("Senha é obrigatória")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, 
      "Senha deve conter pelo menos uma letra maiúscula, um número e um caracter especial")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: yup.string().required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
  address: yup.object().shape({
    street: yup.string().required("Rua/Avenida é obrigatória"),
    number: yup.string().required("Número é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    complement: yup.string().nullable(),
  })
});
