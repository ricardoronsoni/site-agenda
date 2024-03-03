import React, { useRef, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Icon from "@/components/ui/Icon";

let ubsSchema = yup.object().shape({
    ubs: yup
        .string()
        .oneOf(['UBS 1 Asa Sul', 'UBS 5 Taguatinga', 'UBS 1 Paranoá'], 'Estabelecimento de Saúde inválido')
        .required('Informe o Estabelecimento de Saúde'),
});

const schema = yup.object().shape({
    unidades: yup.array().of(ubsSchema)
});

function UserUnidadeAtendimento({ userUnidadeAtendimento, setUserUnidadeAtendimento, submitClicked, onValidation }) {
    const [valuesSelect, setValuesSelect] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        getValues,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: userUnidadeAtendimento && userUnidadeAtendimento.length > 0 ? userUnidadeAtendimento : [],
        mode: "all",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "unidades"
    });

    const unidades = getValues('unidades');

    const options = [
        {
            value: "UBS 1 Asa Sul",
            label: "UBS 1 Asa Sul",
        },
        {
            value: "UBS 5 Taguatinga",
            label: "UBS 5 Taguatinga",
        },
        {
            value: "UBS 1 Paranoá",
            label: "UBS 1 Paranoá",
        },
    ];

    const onSubmit = (data) => {
        setUserenderecos(data);
    };

    const hasValidated = useRef(false);

    const handleChange = (e) => {
        setValueSelect(e.target.value);
    };

    useEffect(() => {
        if (submitClicked) {
            handleSubmit(onSubmit)();
            onValidation(true);
            hasValidated.current = true;
        }
    }, [submitClicked, isValid]);

    return (
        <div className="gap-5 pt-20">
            <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-between">
                <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                    Selecione sua unidade de referência
                </h4>
                <Button
                    text="Adicionar"
                    icon="heroicons-outline:plus"
                    className="btn-dark h-12"
                    onClick={() => append()}
                />
            </div>
            {fields.map((item, index) => (
                <div
                    className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                    key={index}
                >
                    <Select
                        label="Unidade de Referência"
                        key={`unidades${index}`}
                        options={options}
                        value={valuesSelect[index]}
                        error={errors.unidades?.[index]?.ubs}
                        onChange={(event) => {
                            const newValuesSelect = [...valuesSelect];
                            newValuesSelect[index] = event.target.value;
                            setValuesSelect(newValuesSelect);
                            setValue(`unidades[${index}].ubs`, event.target.value);
                        }}
                    />

                    <div className="flex justify-between items-end space-x-5">
                        <div className="flex-none relative">
                            <button
                                onClick={() => remove(index)}
                                type="button"
                                className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                            >
                                <Icon icon="heroicons-outline:trash" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserUnidadeAtendimento;
