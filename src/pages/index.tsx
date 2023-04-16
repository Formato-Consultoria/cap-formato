import Image from 'next/image'
import { useState } from 'react';
import toast from "react-hot-toast";
import cx from "clsx";

import useFormValidation from "@/hooks/useFormValidation";

import { PropStateForm, PropValuesForm } from "@/@Types/form";
import { sendContactForm } from "@/service/email";
import { createCustomer } from '@/service/customer';

const initState: PropStateForm = {
    isLoading: false,
    errors: {},
    values: {
        name: "",
        email: "",
        cargo: "",
        subject: "",
    }
}

export default function Home() {
    const [state, setState] = useState<PropStateForm>(initState);
    const [touched, setTouched] = useState<PropValuesForm>(initState.values);
    const [isDownloadable, setIsDownloadable] = useState(false);

    const { values, isLoading, errors } = state;

    const onBlur = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTouched((prev) => ({
        ...prev,
        [target.name]: true
    }))
    
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [name]: value
            },
        }));
    }


    const onSubmit = async () => {
        if (useFormValidation(state).isValid) {
            setState((prev) => ({
                ...prev,
                isLoading: true,
            }));

            try {
                const { name, email, cargo } = values;

                await toast.promise(
                    createCustomer({
                        name,
                        email,
                        cargo
                    }),
                    {
                        loading: 'Fazendo registro...',
                        success: <b>Registrado com sucesso!</b>,
                        error:  (error) => <b>{error.message}</b>,
                    }, { position: "bottom-center" }
                );

                await toast.promise(
                    sendContactForm({
                        name,
                        email,
                        cargo,
                        subject: `Messagem do(a) ${values.name}`
                    }),
                    {
                        loading: 'Enviando...',
                        success: <b>Enviado com sucesso!</b>,
                        error: (error) => <b>{error.message}</b>,
                    }, { position: "bottom-center" }
                );

                setState(initState);
                setTouched(initState.values);
                setIsDownloadable(true);
            } catch (error: any) {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    errors: error.message,
                }));
            }
        } else {
            for (let error of Object.values(errors)) {
                toast.error(error);
            }
        }
    }

    return (
        <main className={cx(
            "flex mx-auto mt-20 items-stretch justify-stretch",
            "bg-white/50 backdrop-blur-sm",
            "h-[430px] w-4/5",
            "rounded ring-1 ring-zinc-300"
        )}>
            {/* image section */}
            <section className={cx(
                "hidden sm:flex h-full w-full items-center justify-center bg-slate-900/90 rounded-l",
                "relative"
            )}>
                <Image
                    src="https://consultoriaformato.com.br/_next/static/media/Logotipo_light.7eed8403.png"
                    width={240}
                    height={150}
                    alt="imagem do evento"
                />
            </section>

            {/* form section */}
            <section className={"flex flex-col gap-2 items-center h-full w-full px-5 py-3 sm:py-5"}>
                <form className={"h-full w-full"}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}
                        >E-mail</label>
                        <div className="relative group">
                            <div className="group absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true"
                                    className={"w-5 h-5 text-gray-500 dark:text-gray-400"}
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={cx("group/input",
                                    "mt-1 pl-10 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mediumn shadow-sm placeholder-slate-400 focus:outline-none",
                                    "focus:border-[#b50cfb] focus:ring-1 focus:ring-[#b50cfb]",
                                    (touched.email || values.email) && "disabled:bg-slate-50 disabled:text-slate-500 disabled:placeholder:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 invalid:placeholder:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
                                )}
                                placeholder="name@gmail.com"
                                required
                                onChange={handleChange}
                                value={values.email}
                                onBlur={onBlur}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}
                        >Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={cx(
                                "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mediumn shadow-sm placeholder-slate-400",
                                "focus:outline-none focus:border-[#b50cfb] focus:ring-1 focus:ring-[#b50cfb]",
                                (touched.name || values.name) && "disabled:bg-slate-50 disabled:text-slate-500 disabled:placeholder:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 invalid:placeholder:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            )}
                            placeholder="Nome completo"
                            required
                            onChange={handleChange}
                            value={values.name}
                            onBlur={onBlur}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="cargo"
                            className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}
                        >Cargo</label>
                        <input
                            type="text"
                            name="cargo"
                            id="cargo"
                            className={cx(
                                "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mediumn shadow-sm placeholder-slate-400",
                                "focus:outline-none focus:border-[#b50cfb] focus:ring-1 focus:ring-[#b50cfb]",
                                (touched.cargo || values.cargo) && "disabled:bg-slate-50 disabled:text-slate-500 disabled:placeholder:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 invalid:placeholder:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
                            )}
                            placeholder="Cargo"
                            required
                            onChange={handleChange}
                            value={values.cargo}
                            onBlur={onBlur}
                        />
                    </div>

                    <button
                        type='button'
                        onClick={onSubmit}
                        disabled={!values.cargo || !values.email || !values.name || isLoading}
                        className="text-white dark:bg-[#b50cfb]/80 dark:hover:bg-[#b50cfb] focus:ring-3 focus:outline-none dark:focus:ring-fuchsia-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >Enviar</button>
                </form>
                {isDownloadable && <div>
                    <a
                        href="/download/doc.pdf"
                        download
                        className="flex items-center rounded bg-[#b50cfb] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#b50cfb] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="mr-1 h-4 w-4">
                            <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clipRule="evenodd" />
                        </svg>
                        Download do arquivo
                    </a>
                </div>}
            </section>
        </main>
    )
}