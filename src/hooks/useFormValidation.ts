import { PropStateForm } from "@/@Types/form";

export default function useFormValidation({ values, errors }: PropStateForm) {
    const { name, email, cargo } = values;
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

    if(!cargo) {
        isValid = false;
        errors.cargo = "Precisamos que informe o seu cargo ou profissão!";
    } else {
        delete errors.cargo
    }

    return {
        isValid
    }
}