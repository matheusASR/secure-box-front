import * as yup from "yup";

export const editPasswordSchema = yup.object().shape({
  password: yup.string()
    .required("Senha é obrigatória")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, 
      "Senha deve conter pelo menos uma letra maiúscula, um número e um caracter especial")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});
