import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
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


const LoginForm = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (!response.data.token) {
        throw new Error("Credenciais Invalidas");
      }

      dispatch(setUser(data));
      navigate("/inicio");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Seja bem-vindo!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="cpf"
        label="CPF"
        defaultValue="39935887030"
        type="string"
        register={register}
        error={errors.cpf}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="Senha"
        type="password"
        defaultValue="agendaSus"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Esqueceu sua senha?{" "}
        </Link>
      </div>

      <Button
        type="submit"
        text="Entrar"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
