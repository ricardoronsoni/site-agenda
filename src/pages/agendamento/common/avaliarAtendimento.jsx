import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Textarea from "@/components/ui/Textarea";
import Select, { components } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { acaoOption } from "@/constant/optionsSelects"
import Textinput from "@/components/ui/Textinput";
import Radio from "@/components/ui/Radio";
import { avaliar } from "@/constant/optionsSelects";
import { Icon } from "@iconify/react";
import Button from "@/components/ui/Button";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const FormValidationSchema = yup
    .object({
        // unidade: yup.mixed().required("Campo obrigatório"),
        // equipe: yup.mixed().required("Campo obrigatório"),
        // profissional: yup.mixed().required("Campo obrigatório"),
    })
    .required();

export default function AvaliarAtendimento({ avaliarAtendimento, setAvaliarAtendimento }) {
    const [selectColor, setSelectColor] = useState("primary-500");
    const [selectEquipe, setSelectEquipe] = useState("primary-500");
    const [selectProfissional, setSelectProfissional] = useState("primary-500");

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = () => {
        toast.success("Obrigado por contribuir com a melhoria dos serviços ofertados!");
        setAvaliarAtendimento(false);
    };

    const handleColor = (e) => {
        setSelectColor(e.target.value);
    };

    const handleColorEquipe = (e) => {
        setSelectEquipe(e.target.value);
    };

    const handleColorProfissional = (e) => {
        setSelectProfissional(e.target.value);
    };

    return (
        <div>
            <Modal
                title="Avalie seu Atendimento"
                labelclassName="btn-outline-dark"
                activeModal={avaliarAtendimento}
                onClose={() => setAvaliarAtendimento(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <div className="grid gap-4">
                        <div className="col-span-1">
                            <label className="form-label" htmlFor="unidade">
                                Como você avalia o atendimento recebido na unidade de Saúde?
                            </label>
                            <div className="flex flex-wrap space-xy-5">
                                {avaliar.map((color) => (
                                    <Radio
                                        label={color.label}
                                        name="unidade"
                                        value={color.value}
                                        checked={selectColor === color.value}
                                        onChange={handleColor}
                                        activeClass={color.activeClass}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="form-label" htmlFor="equipe">
                                Como você avalia o atendimento recebido pela equipe de Saúde?
                            </label>
                            <div className="flex flex-wrap space-xy-5">
                                {avaliar.map((color) => (
                                    <Radio
                                        label={color.label}
                                        name="equipe"
                                        value={color.value}
                                        checked={selectEquipe === color.value}
                                        onChange={handleColorEquipe}
                                        activeClass={color.activeClass}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={errors.profissional ? "has-error" : ""}>
                            <label className="form-label" htmlFor="Profissional">
                                Como você avalia o atendimento recebido pelo(a) Profissional de Saúde?
                            </label>
                            <div className="flex flex-wrap space-xy-5">
                                {avaliar.map((color) => (
                                    <Radio
                                        label={color.label}
                                        name="profissional"
                                        value={color.value}
                                        checked={selectProfissional === color.value}
                                        onChange={handleColorProfissional}
                                        activeClass={color.activeClass}
                                    />
                                ))}
                            </div>
                        </div>
                        <Textarea
                            label="Deixe seu comentário:"
                            placeholder="Comentário"
                        />
                    </div>

                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark  text-center">Avaliar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};