import { useState } from 'react';
import toast from "react-hot-toast";
import cx from "clsx";
import Image from 'next/image'

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

import localFont from 'next/font/local';
import Link from 'next/link';

const burnstownDam = localFont({
    src: '../../public/fonts/burnstown-dam.otf',
    display: 'swap',
})

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
                        error: (error) => <b>{error.message}</b>,
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
        <main className='flex flex-col'>
            <section className={"flex items-center justify-center gap-10 md:gap-24 md:px-3 pt-20 pb-10"}>
                <div className={"flex flex-col w-full md:w-2/5 px-5 md:p-0"}>
                    <p className={"uppercase text-lg text-center md:text-left"}>o hambúrguer original</p>
                    {/* <h1
                        className={cx(
                            burnstownDam.className,
                            'text-7xl uppercase text-center md:text-left',
                            'mb-6'
                        )}
                    >SABORY & DELICIOUS</h1> */}
                    <h1
                        className={cx(
                            burnstownDam.className,
                            'text-7xl uppercase text-center md:text-left',
                            'mb-6'
                        )}
                    >Armazém do Hambúrger</h1>
                    <p className={"text-lg font-sans font-light text-center md:text-left text-orange-200/70"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum impedit quis consectetur iste sed laboriosam esse consequuntur reprehenderit numquam eum dicta illum qui, veritatis repellat at.</p>
                </div>

                <div className="hidden md:flex">
                    <Image
                        className={"bg-transparent"}
                        src={"/images/hamburger-out.svg"}
                        width={380}
                        height={380}
                        alt={"imagem de um hamburger"}
                    />
                </div>
            </section>


            <section className={cx(
                "h-auto w-full bg-orange-300 grid grid-cols-2 md:grid-cols-3 gap-2 py-10 px-5 md:px-10 lg:px-24",
            )}>

                <h2 className={"text-4xl font-bold my-10"}>Lorem ipsum dolor sit amet consectetur</h2>

                <div className={"relative py-10 px-5 rounded-2xl h-48 w-full"}>
                    <h4 className='absolute z-10 text-xl lg:text-2xl text-orange-200 uppercase'>Cheeseburger</h4>
                    <Image
                        className="h-full w-full object-cover rounded-2xl brightness-50"
                        src="/images/grid/hamburger-01.jpg"
                        fill
                        alt="hamburger image"
                    />
                </div>
                <div className={"relative py-10 px-5 rounded-2xl h-48 w-full"}>
                    <h4 className='absolute z-10 text-xl lg:text-2xl text-orange-200 uppercase'>Hamburger de Frango</h4>
                    <Image
                        className="h-full w-full object-cover rounded-2xl brightness-50"
                        src="/images/grid/hamburger-02.jpg"
                        fill
                        alt="hamburger image"
                    />
                </div>
                <div className={"relative py-10 px-5 rounded-2xl h-48 w-full"}>
                    <h4 className='absolute z-10 text-xl lg:text-2xl text-orange-200 uppercase'>Hamburger Vegetariano</h4>
                    <Image
                        className="h-full w-full object-cover rounded-2xl brightness-50"
                        src="/images/grid/hamburger-03.jpg"
                        fill
                        alt="hamburger image"
                    />
                </div>
                <div className={"relative py-10 px-5 rounded-2xl h-48 w-full"}>
                    <h4 className='absolute z-10 text-xl lg:text-2xl text-orange-200 uppercase'>Hamburger de Carne Duplo</h4>
                    <Image
                        className="h-full w-full object-cover rounded-2xl brightness-50"
                        src="/images/grid/hamburger-05.png"
                        fill
                        alt="hamburger image"
                    />
                </div>
                <div className={"relative py-10 px-5 rounded-2xl h-48 w-full"}>
                    <h4 className='absolute z-10 text-xl lg:text-2xl text-orange-200 uppercase'>Bacon Cheeseburger</h4>
                    <Image
                        className="h-full w-full object-cover rounded-2xl brightness-50"
                        src="/images/grid/hamburger-06.png"
                        fill
                        alt="hamburger image"
                    />
                </div>
            </section>

            <div className={cx(
                "flex mx-auto items-stretch justify-stretch",
                "bg-white/50 backdrop-blur-sm",
                "h-[430px] w-full",
            )}>
                {/* image section */}
                <section className={cx(
                    "hidden sm:flex h-full w-full items-center justify-center bg-brown-hamburger/90",
                    "relative"
                )}>
                    <Image
                        src="/images/menu-hamburger-1.svg"
                        fill
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
            </div>

            <footer className="bg-black">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><g fill="currentColor"><path d="M12.743 6c-5.153 0-9.318 4.177-9.318 9.318v.132c.52-.008.887-.074 1.192-.171c.285-.091.529-.212.82-.366A7.317 7.317 0 0 1 12.742 8h6.524c3.901 0 7.097 3.064 7.316 6.916c.288.153.53.273.812.363c.306.098.675.164 1.2.171v-.134C28.584 10.176 24.41 6 19.267 6h-6.524Zm14.191 13.057a8.113 8.113 0 0 1-.686-.187c-.588-.188-1.14-.465-1.654-.723a31.445 31.445 0 0 0-.453-.225c-.453-.218-.923-.373-1.787-.373c-.648 0-1.206.134-1.774.381a9.171 9.171 0 0 0-.602.3l-.013.006c-.212.112-.447.236-.706.353a7.033 7.033 0 0 1-1.68.528h9.355v-.06ZM4.56 21l7.182 1.61c2.797.628 5.708.628 8.506 0L27.43 21h.245c.973 0 1.825.862 1.825 2s-.852 2-1.825 2H4.325c-.973 0-1.825-.862-1.825-2s.852-2 1.825-2h.235Zm9.882-1.883H5.065v-.035c1.014-.21 1.718-.583 2.321-.906l.02-.01c.358-.192.635-.339.966-.445c.324-.103.72-.172 1.294-.172c.575 0 .969.069 1.292.172c.33.105.605.251.962.443l.022.011c.638.343 1.388.74 2.5.942Z"/><path d="M19.207 9.772a.772.772 0 1 1-1.544 0a.772.772 0 0 1 1.544 0Zm-5.642.771a.772.772 0 1 0 0-1.543a.772.772 0 0 0 0 1.543Zm8.328 1.393a.772.772 0 1 1-1.544 0a.772.772 0 0 1 1.544 0Zm-11.014.772a.772.772 0 1 0 0-1.543a.772.772 0 0 0 0 1.543ZM16 13.59a.772.772 0 1 0 0-1.544a.772.772 0 0 0 0 1.544ZM3.565 27.176V25.89c.241.071.495.109.76.109h1.24v1.176c0 1.097.79 1.824 1.576 1.824h17.698c.787 0 1.587-.73 1.595-1.839V26h1.24c.265 0 .52-.038.76-.109v1.28C28.421 29.203 26.897 31 24.84 31H7.14c-2.06 0-3.576-1.8-3.576-3.824ZM9.666 14.75c-1.799 0-2.747.504-3.591.956l-.035.018c-.344.184-.694.372-1.119.507c-.438.14-.938.22-1.598.22c-.492 0-.894.4-.894.9c0 .498.402.899.894.899c1.799 0 2.747-.504 3.591-.956l.035-.018c.344-.184.694-.372 1.12-.507c.437-.14.937-.22 1.597-.22c.66 0 1.158.08 1.596.22c.424.134.773.322 1.116.506l.036.019c.844.452 1.792.956 3.596.956c1.306 0 2.16-.265 2.836-.572c.232-.105.445-.217.662-.331l.005-.003c.214-.112.438-.23.668-.33a5.29 5.29 0 0 1 2.172-.465c1.021 0 1.64.191 2.223.473c.179.086.35.172.517.256c.497.25.953.478 1.46.64a6.927 6.927 0 0 0 2.134.332c.492 0 .894-.4.894-.9c0-.498-.402-.9-.894-.9c-.66 0-1.158-.079-1.596-.218c-.424-.136-.773-.323-1.115-.507l-.035-.019c-.455-.244-.917-.49-1.515-.673c-.541-.165-1.205-.283-2.072-.283c-.868 0-1.532.118-2.073.283c-.48.147-.91.351-1.372.57c-.187.088-.379.18-.581.27c-.68.304-1.43.578-2.318.578c-.663 0-1.164-.08-1.603-.22c-.426-.136-.776-.323-1.119-.507l-.033-.018c-.843-.452-1.79-.956-3.589-.956Zm-4.474 5.367h21.606l-6.769 1.517a18.455 18.455 0 0 1-8.069 0l-6.768-1.517Z"/></g></svg>
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Armazém do Hambúrger</span>
                        </div>
                        <ul className="flex gap-3 flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                            <li>
                                <Link
                                    href="#"
                                    className="mr-4 md:mr-6"
                                    target='_blank'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="currentColor" d="M32 16c0-8.839-7.167-16-16-16C7.161 0 0 7.161 0 16c0 7.984 5.849 14.604 13.5 15.803V20.626H9.437v-4.625H13.5v-3.527c0-4.009 2.385-6.223 6.041-6.223c1.751 0 3.584.312 3.584.312V10.5h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-.713 4.625H18.5v11.177C26.145 30.603 32 23.983 32 15.999z"/></svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="mr-4 md:mr-6"
                                    target='_blank'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9.52A2.48 2.48 0 1 0 14.48 12A2.48 2.48 0 0 0 12 9.52Zm9.93-2.45a6.53 6.53 0 0 0-.42-2.26a4 4 0 0 0-2.32-2.32a6.53 6.53 0 0 0-2.26-.42C15.64 2 15.26 2 12 2s-3.64 0-4.93.07a6.53 6.53 0 0 0-2.26.42a4 4 0 0 0-2.32 2.32a6.53 6.53 0 0 0-.42 2.26C2 8.36 2 8.74 2 12s0 3.64.07 4.93a6.86 6.86 0 0 0 .42 2.27a3.94 3.94 0 0 0 .91 1.4a3.89 3.89 0 0 0 1.41.91a6.53 6.53 0 0 0 2.26.42C8.36 22 8.74 22 12 22s3.64 0 4.93-.07a6.53 6.53 0 0 0 2.26-.42a3.89 3.89 0 0 0 1.41-.91a3.94 3.94 0 0 0 .91-1.4a6.6 6.6 0 0 0 .42-2.27C22 15.64 22 15.26 22 12s0-3.64-.07-4.93Zm-2.54 8a5.73 5.73 0 0 1-.39 1.8A3.86 3.86 0 0 1 16.87 19a5.73 5.73 0 0 1-1.81.35H8.94A5.73 5.73 0 0 1 7.13 19a3.51 3.51 0 0 1-1.31-.86A3.51 3.51 0 0 1 5 16.87a5.49 5.49 0 0 1-.34-1.81V8.94A5.49 5.49 0 0 1 5 7.13a3.51 3.51 0 0 1 .86-1.31A3.59 3.59 0 0 1 7.13 5a5.73 5.73 0 0 1 1.81-.35h6.12a5.73 5.73 0 0 1 1.81.35a3.51 3.51 0 0 1 1.31.86A3.51 3.51 0 0 1 19 7.13a5.73 5.73 0 0 1 .35 1.81V12c0 2.06.07 2.27.04 3.06Zm-1.6-7.44a2.38 2.38 0 0 0-1.41-1.41A4 4 0 0 0 15 6H9a4 4 0 0 0-1.38.26a2.38 2.38 0 0 0-1.41 1.36A4.27 4.27 0 0 0 6 9v6a4.27 4.27 0 0 0 .26 1.38a2.38 2.38 0 0 0 1.41 1.41a4.27 4.27 0 0 0 1.33.26h6a4 4 0 0 0 1.38-.26a2.38 2.38 0 0 0 1.41-1.41a4 4 0 0 0 .26-1.38V9a3.78 3.78 0 0 0-.26-1.38ZM12 15.82A3.81 3.81 0 0 1 8.19 12A3.82 3.82 0 1 1 12 15.82Zm4-6.89a.9.9 0 0 1 0-1.79a.9.9 0 0 1 0 1.79Z"/></svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="mr-4 md:mr-6"
                                    target='_blank'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.ifood.com.br/delivery/paracatu-mg/armazem-do-hamburguer-centro/6de04fc3-8fff-4a0e-a2fa-c078345d1d5a"
                                    className="mr-4 md:mr-6 -mb-5"
                                    target='_blank'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8.428 1.67c-4.65 0-7.184 4.149-7.184 6.998c0 2.294 2.2 3.299 4.25 3.299l-.006-.006c4.244 0 7.184-3.854 7.184-6.998c0-2.29-2.175-3.293-4.244-3.293zm11.328 0c-4.65 0-7.184 4.149-7.184 6.998c0 2.294 2.2 3.299 4.25 3.299l-.006-.006C21.061 11.96 24 8.107 24 4.963c0-2.29-2.18-3.293-4.244-3.293zm-5.584 12.85l2.435 1.834c-2.17 2.07-6.124 3.525-9.353 3.17A8.913 8.913 0 0 1 .23 14.541H0a9.598 9.598 0 0 0 8.828 7.758c3.814.24 7.323-.905 9.947-3.13l-.004.007l1.08 2.988l1.555-7.623l-7.234-.02Z"/></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                    <span className="block text-sm sm:text-center text-gray-400 font-sans">© 2023 <Link href="https://www.whatsmenu.com.br/armazemdohamburguer" target='_blank' className="hover:underline font-sans">armazemparacatu</Link>. Todos os direitos reservados.</span>
                </div>
            </footer>
        </main>
    )
}