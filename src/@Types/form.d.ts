export interface PropValuesForm {
    name: string,
    email: string,
    telefone: string,
    subject: string
};

export interface PropStateForm {
    isLoading: boolean,
    errors: {
        [key: string]: string,
    },
    values: PropValuesForm,
};

export interface PropsDialogError {
    messageError: string,
}