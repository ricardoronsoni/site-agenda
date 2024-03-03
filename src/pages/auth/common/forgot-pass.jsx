import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cpf } from "cpf-cnpj-validator";

const schema = yup
  .object({
    cpf: yup
      .string()
      .test('cpf', 'CPF inválido', value => cpf.isValid(value))
      .required('CPF é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
  })
  .required();

const ForgotPass = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="cpf"
        label="CPF"
        defaultValue="Informe seu CPF"
        type="cpf"
        register={register}
        error={errors.cpf}
        className="h-[48px]"
      />

      <button className="btn btn-dark block w-full text-center">
        Envie um e-mail para recuperar a senha
      </button>
    </form>
  );
};

export default ForgotPass;
