import React, { useRef, useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@/components/ui/Select";
import { Controller } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Icon from "@/components/ui/Icon";

let enderecoSchema = yup.object().shape({
    tipoEndereco: yup
        .string()
        .oneOf(['Residencial', 'Comercial', 'Outro'], 'Tipo de endereço inválido')
        .required('Informe o tipo de endereço'),
    cep: yup.string().required("O CEP é obrigatório").matches(/^[0-9]{5}-[0-9]{3}$/, "CEP Inválido"),
    rua: yup.string().required("A rua é obrigatória"),
    numero: yup.string().required("O número é obrigatório"),
    bairro: yup.string().required("O bairro é obrigatório"),
    uf: yup.string().required("A UF é obrigatório"),
    municipio: yup.string().required("É necessário informar o município")
});

const schema = yup.object().shape({
    enderecos: yup.array().of(enderecoSchema)
});

function UserEnderecos({ userEnderecos, setUserenderecos, submitClicked, onValidation }) {
    const [valueSelect, setValueSelect] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        getValues,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: userEnderecos && userEnderecos.length > 0 ? userEnderecos : [
            {
                tipoEndereco: '',
                cep: '',
                rua: '',
                numero: '',
                bairro: '',
                uf: '',
                municipio: ''
            }
        ],
        mode: "all",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "enderecos"
    });

    const enderecos = getValues('enderecos');

    const options = [
        {
            value: "Residencial",
            label: "Residencial",
        },
        {
            value: "Comercial",
            label: "Comercial",
        },
        {
            value: "Outro",
            label: "Outro",
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
                    Informe seus endereço
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
                        label="Tipo de Endereço"
                        options={options}
                        value={valueSelect}
                        defaultValue={options[0].value}
                        error={errors.enderecos?.[index]?.tipoEndereco}
                        onChange={(event) => {
                            handleChange(event);
                            setValue(`enderecos[${index}].tipoEndereco`, event.target.value);
                        }}
                    />

                    <Textinput
                        label="CEP"
                        type="text"
                        id={`cep${index}`}
                        error={errors?.enderecos?.[index]?.cep}
                        placeholder="CEP"
                        onChange={(event) => {
                            setValue(`enderecos[${index}].cep`, event.target.value);
                        }}
                    />

                    <Textinput
                        label="numero"
                        type="text"
                        id={`numero${index}`}
                        placeholder="Nº"
                        error={errors?.enderecos?.[index]?.numero}
                        onChange={(event) => {
                            setValue(`enderecos[${index}].numero`, event.target.value);
                        }}
                    />

                    <Textinput
                        label="Bairro"
                        type="text"
                        id={`bairro${index}`}
                        placeholder="BAIRRO"
                        onChange={(event) => {
                            setValue(`enderecos[${index}].bairro`, event.target.value);
                        }}
                        error={errors?.enderecos?.[index]?.bairro}
                    />

                    <Textinput
                        label="UF"
                        type="text"
                        id={`uf${index}`}
                        placeholder="UF"
                        onChange={(event) => {
                            setValue(`enderecos[${index}].uf`, event.target.value);
                        }}
                        error={errors?.enderecos?.[index]?.uf}
                    />

                    <Textinput
                        label="Município"
                        type="text"
                        id={`municipio${index}`}
                        placeholder="Município"
                        onChange={(event) => {
                            setValue(`enderecos[${index}].municipio`, event.target.value);
                        }}
                        error={errors?.enderecos?.[index]?.municipio}
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

export default UserEnderecos;
