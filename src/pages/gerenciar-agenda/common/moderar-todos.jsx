import React from "react";
import Modal from "@/components/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Textarea from "@/components/ui/Textarea";
import Select, { components } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { acaoOption } from "@/constant/optionsSelects"

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

export default function ModerarTodos({ moderarTodos, setModerarTodos }) {
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
        console.log("Moderar Agendas")
        toast.success("Agendas moderadas com sucesso!");
        setModerarTodos(false);
    };

    return (
        <div>
            <Modal
                title="Moderar Agendas"
                labelclassName="btn-outline-dark"
                activeModal={moderarTodos}
                onClose={() => setModerarTodos(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
                        <button className="btn btn-dark  text-center">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};