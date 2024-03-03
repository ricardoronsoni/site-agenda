import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import UserData from "./common/usuarioDados-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import UserEnderecos from "./common/usuarioEndereco-form";
import UserUnidadeAtendimento from "./common/usuarioUnidade-form";
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: "Dados Pessoais e Contato",
    },
    {
        id: 2,
        title: "Endereços",
    },
    {
        id: 3,
        title: "Unidades de Atendimento",
    },
];

const FormWizard = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [canChangeScreen, setCanChangeScreen] = useState(false);
    const [userData, setUserdata] = useState({});
    const [userEnderecos, setUserEnderecos] = useState([]);
    const [userUnidadeAtendimento, setUserUnidadeAtendimento] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (submitClicked) {
            onSubmit();
        }
    }, [submitClicked]);

    const handleSubmit = () => {
        setSubmitClicked(true);
    };

    const handleValidation = (isValid) => {
        setCanChangeScreen(isValid);
    };

    const onSubmit = (data) => {
        let totalSteps = steps.length;
        const isLastStep = stepNumber === totalSteps - 1;
        if (isLastStep) {
            toast.success("Usuário Cadastrado com sucesso!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setCanChangeScreen(false);
            navigate('/inicio');
        } else if (!canChangeScreen) {
            toast.error("Por favor, preencha os campos corretamente!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setStepNumber(stepNumber + 1);
            setCanChangeScreen(false);
        }

        setSubmitClicked(false);
    };

    const handlePrev = () => {
        setStepNumber(stepNumber - 1);
    };

    return (
        <div>
            <Card title="Perfil">
                <div>
                    <div className="flex z-[5] items-center relative justify-center md:mx-8">
                        {steps.map((item, i) => (
                            <div
                                className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
                                key={i}
                            >
                                <div
                                    className={`${stepNumber >= i
                                        ? "bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900"
                                        : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70"
                                        }  transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium`}
                                >
                                    {stepNumber <= i ? (
                                        <span> {i + 1}</span>
                                    ) : (
                                        <span className="text-3xl">
                                            <Icon icon="bx:check-double" />
                                        </span>
                                    )}
                                </div>

                                <div
                                    className={`${stepNumber >= i
                                        ? "bg-slate-900 dark:bg-slate-900"
                                        : "bg-[#E0EAFF] dark:bg-slate-700"
                                        } absolute top-1/2 h-[2px] w-full`}
                                ></div>
                                <div
                                    className={` ${stepNumber >= i
                                        ? " text-slate-900 dark:text-slate-300"
                                        : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                                        } absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100`}
                                >
                                    <span className="w-max">{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="conten-box ">
                        <form>
                            {stepNumber === 0 && (
                                <UserData
                                    UserData={userData}
                                    setUserdata={setUserdata}
                                    submitClicked={submitClicked}
                                    onValidation={setCanChangeScreen}
                                />
                            )}

                            {stepNumber === 1 && (
                                <UserEnderecos
                                    UserEnderecos={userEnderecos}
                                    setUserenderecos={setUserEnderecos}
                                    submitClicked={submitClicked}
                                    onValidation={setCanChangeScreen}
                                />
                            )}
                            {stepNumber === 2 && (
                                <UserUnidadeAtendimento
                                    userUnidadeAtendimento={userUnidadeAtendimento}
                                    setUserUnidadeAtendimento={setUserUnidadeAtendimento}
                                    submitClicked={submitClicked}
                                    onValidation={setCanChangeScreen}
                                />
                            )}

                            <div
                                className={`${stepNumber > 0 ? "flex justify-between" : " text-right"
                                    } mt-10`}
                            >
                                {stepNumber !== 0 && (
                                    <Button
                                        text="Voltar"
                                        className="btn-dark"
                                        onClick={handlePrev}
                                    />
                                )}
                                <Button
                                    text={stepNumber !== steps.length - 1 ? "Próximo" : "Finalizar"}
                                    className="btn-dark"
                                    type="button"
                                    onClick={handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FormWizard;
