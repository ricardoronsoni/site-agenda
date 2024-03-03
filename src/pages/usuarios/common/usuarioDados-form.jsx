import React, { useRef, useState, useEffect } from "react";
import InputGroup from "@/components/ui/InputGroup";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let stepSchema = yup.object().shape({
    cpf: yup
        .string()
        .required("Informe seu cpf")
        .matches(/^[0-9]{11}$/, "Numero de CPF Inválido - Informe 11 Digitos"),
    nomeCompleto: yup.string().required("Full name is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
    phone: yup
        .string()
        .required("Um número de telefone é obrigatório")
        .matches(/^[0-9]{12}$/, "Numero Inválido - Informe DDD com 3 Digígos + Número com 9 Digitos"),
    password: yup
        .string()
        .required("É necessário informar uma senha")
        .min(8, "Password must be at least 8 characters"),
    confirmpass: yup
        .string()
        .required("Confirme sua senha")
        .oneOf([yup.ref("password"), null], "As senhas devem ser identicas"),
    emailNotification: yup.boolean(),
    smsNotification: yup.boolean(),
    whatsAppNotification: yup.boolean(),
});

function UserData({ userData, setUserdata, submitClicked, onValidation }) {
    const [emailNotificationChecked, setEmailNotificationChecked] = useState(false);
    const [smsNotificationChecked, setSmsNotificationChecked] = useState(false);
    const [whatsappNotificationChecked, setWhatsappNotificationChecked] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(stepSchema),
        defaultValues: userData && Object.keys(userData).length > 0 ? userData : {
            checkedEmail: false,
            checkedSms: false,
            checkedWhatsApp: false
        },
        mode: "all",
    });

    const onSubmit = (data) => {
        setUserdata(data);
    };

    const hasValidated = useRef(false);

    useEffect(() => {
        onValidation(isValid);
    }, [isValid]);

    useEffect(() => {
        if (submitClicked) {
            handleSubmit(onSubmit)();
            hasValidated.current = true;
        }
    }, [submitClicked]);

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
            <div className="lg:col-span-3 md:col-span-2 col-span-1">
                <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                    Informe seus dados pessoais
                </h4>
            </div>
            <Textinput
                label="CPF"
                type="text"
                placeholder="Informe seu cpf"
                name="cpf"
                error={errors.cpf}
                register={register}
            />
            <Textinput
                label="Nome Completo"
                type="text"
                placeholder="Digite aqui seu nome completo"
                name="nomeCompleto"
                error={errors.nomeCompleto}
                register={register}
            />
            <Textinput
                label="Email"
                type="email"
                placeholder="Digite seu e-mail"
                name="email"
                error={errors.email}
                register={register}
            />
            <InputGroup
                label="Digite seu número de telefone"
                type="text"
                prepend="BR (+55)"
                placeholder="Número de telefone com DDD"
                name="phone"
                error={errors.phone}
                register={register}
            />
            <Textinput
                label="Password"
                type="password"
                placeholder="Digite uma senha"
                name="password"
                error={errors.password}
                hasicon
                register={register}
            />
            <Textinput
                label="Confirm Password"
                type="password"
                placeholder="Confirme sua senha"
                name="confirmpass"
                error={errors.confirmpass}
                register={register}
                hasicon
            />
            <Checkbox
                label="Gostaria de ser notificado por e-mail sobre mudanças na minha agenda de atendimentos."
                value={emailNotificationChecked}
                onChange={() => {
                    setEmailNotificationChecked(!emailNotificationChecked);
                    setValue('emailNotification', emailNotificationChecked);
                }}
            />
            <Checkbox
                label="Gostaria de ser notificado por SMS sobre mudanças na minha agenda de atendimentos."
                value={smsNotificationChecked}
                onChange={() => {
                    setSmsNotificationChecked(!smsNotificationChecked);
                    setValue('smsNotification', smsNotificationChecked);
                }}
            />
            <Checkbox
                label="Gostaria de ser notificado por WhatsApp sobre mudanças na minha agenda de atendimentos."
                value={whatsappNotificationChecked}
                onChange={() => {
                    setWhatsappNotificationChecked(!whatsappNotificationChecked);
                    setValue('whatsappNotification', whatsappNotificationChecked);
                }}
            />
        </div>
    );
}

export default UserData;