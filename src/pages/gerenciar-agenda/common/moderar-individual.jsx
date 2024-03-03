import React from "react";
import Modal from "@/components/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Textarea from "@/components/ui/Textarea";
import Select, { components } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { acaoOption } from "@/constant/optionsSelects"
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const FormValidationSchema = yup
    .object({
        acao: yup.mixed().required("É necessário selecionar uma ação"),
    })
    .required();

export default function ModerarUm({ moderarUm, setModerarUm, data }) {
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
        toast.success("Agenda moderada com sucesso!");
        setModerarUm(false);
    };

    return (
        <div>
            <Modal
                title="Moderar Agenda"
                labelclassName="btn-outline-dark"
                activeModal={moderarUm}
                onClose={() => setModerarUm(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <h4 className="text-lg font-semibold">Usuário</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {/* <div className="col-span-1">
                            <label className="form-label" htmlFor="nome">
                                CPF
                            </label>
                            <div className="grid grid-flex grid-cols-6 gap-1 items-center">
                                <div className="col-span-5">
                                    <Textinput
                                        type="text"
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        options={{ delimiters: ['·', '·', '-'], blocks: [3, 3, 3, 2] }}
                                        className="form-input"
                                        prepend={<Icon icon="heroicons-outline:search" />}
                                        isMask
                                        // value={data.nome}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Button icon="heroicons-outline:magnifying-glass-circle" className="btn-dark btn-sm" />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-span-2">
                            <Textinput
                                label="Nome"
                                id="nome"
                                type="text"
                                placeholder="nome"
                            />
                        </div>
                        <div className="col-span-2">
                            <Textarea
                                label="Endereço"
                                type="text"
                                id="endereco"
                                placeholder="Endereço"
                            />
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold">Serviço Agendado</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <Textinput
                                label="Data"
                                id="date"
                                options={{ date: true, datePattern: ["d", "m", "Y"] }}
                                placeholder="DD-MM-YYYY"
                                isMask
                            />
                        </div>
                        <div className="col-span-1">
                            <Textinput
                                label="Horário Agendado"
                                id="hora"
                                options={{ time: true, timePattern: ["h", "m", "s"] }}
                                placeholder="HH:MM:SS"
                                isMask
                            />
                        </div>
                        <div className="col-span-2">
                            <Textinput
                                label="Serviço"
                                id="servico"
                                type="text"
                                placeholder="Serviço Agendado"
                            />
                        </div>
                        <div className="col-span-2">
                            <Textinput
                                label="Profissional"
                                id="profissional"
                                type="text"
                                placeholder="Profissional Agendado"
                            />
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold">Moderar Agenda</h4>
                    <div className={errors.acao ? "has-error" : ""}>
                        <label className="form-label" htmlFor="acao">
                            Ação
                        </label>
                        <Controller
                            name="acao"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={acaoOption}
                                    styles={styles}
                                    className="react-select"
                                    classNamePrefix="select"
                                    id="acao"
                                />
                            )}
                        />
                        {errors.assign && (
                            <div className=" mt-2  text-danger-500 block text-sm">
                                {errors.acao?.message || errors.acao?.label.message}
                            </div>
                        )}
                    </div>
                    <Textarea
                        label="motivo"
                        placeholder="Motivo"
                    />

                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark  text-center">Moderar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};