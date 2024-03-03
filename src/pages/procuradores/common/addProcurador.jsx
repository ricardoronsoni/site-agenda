import React from "react";
import Modal from "@/components/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { vinculo } from "@/constant/optionsSelects"
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const FormValidationSchema = yup
    .object({
        cpf: yup.string()
            .transform(value => value.replace(/[·-]/g, ''))
            .required('CPF é obrigatório')
            .length(11, 'CPF deve ter 11 dígitos'),
        nome: yup.string().required("É necessário informar o nome do procurador"),
        vinculo: yup.mixed().required("É informar o vínvulo do procurador"),
    })
    .required();

export default function AddProcurador({ addProcurador, setAddProcurador }) {
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
        setAddProcurador(false);
        Swal.fire({
            title: "Deseja conceder a procuração?",
            text: "Ao incluir um procurador você concede a ele poderes para agendar, cancelar e visulizar serviços de saúde em seu nome! Você confirma a inclusão deste procurador?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Estou ciente e autorizo",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Procuração Incluída!", "Seu procurador agora poderá gerenciar sua agenda de cuidados em seu nome!", "success");
            }
        });
    };

    return (
        <div>
            <Modal
                title="Moderar Agenda"
                labelclassName="btn-outline-dark"
                activeModal={addProcurador}
                onClose={() => setAddProcurador(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <h4 className="text-lg font-semibold">Usuário</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="form-label" htmlFor="nome">
                                CPF
                            </label>
                            <div className="grid grid-flex grid-cols-6 gap-1 items-center">
                                <div className="col-span-5">
                                    <Textinput
                                        name="cpf"
                                        type="text"
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        className="form-input"
                                        // options={{ delimiters: ['·', '·', '-'], blocks: [3, 3, 3, 2] }}
                                        // isMask
                                        register={register}
                                        error={errors.cpf}
                                    />
                                </div>
                                <div>
                                    <Button icon="heroicons-outline:magnifying-glass-circle" className="btn-dark btn-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Textinput
                                name="nome"
                                label="Nome"
                                id="nome"
                                type="text"
                                placeholder="nome"
                                register={register}
                                error={errors.nome}
                            />
                        </div>
                        <div className={errors.vinculo ? "has-error" : ""}>
                            <label className="form-label" htmlFor="vinculo">
                                Vínculo
                            </label>
                            <Controller
                                name="vinculo"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={vinculo}
                                        styles={styles}
                                        className="react-select"
                                        classNamePrefix="select"
                                        id="vinculo"
                                    />
                                )}
                            />
                            {errors.assign && (
                                <div className=" mt-2  text-danger-500 block text-sm">
                                    {errors.acao?.message || errors.acao?.label.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark  text-center">Adicionar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};