import { PropStateForm } from "@/@Types/form";

export default function useFormValidation({ values, errors }: PropStateForm) {
    const { name, email, telefone } = values;
    let isValid = true;

    if(!name) {
        isValid = false;
        errors.name = "Precisamos do seu nome para podermos identifica-lo!";
    } else {
        delete errors.name
    }

    if(!email) {
        isValid = false;
        errors.email = "O campo de e-mail e obrigatório!";
    } else {
        delete errors.email
    }

    if(!telefone) {
        isValid = false;
        errors.telefone = "Precisamos que informe o seu numero de telefone!";
    } else {
        delete errors.telefone
    }

    return {
        isValid
    }
}