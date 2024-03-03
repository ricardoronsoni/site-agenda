import React, { useState } from "react";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import ubsImage from "@/assets/images/all-img/ubs.png";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import HorarioFuncionamento from "./horario-funcionamento";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';


function EstabelecimentoAddEdit(data) {
  let { id } = useParams();
  const navigate = useNavigate();

  const editar = () => {
    if (typeof id !== "undefined") {
      return true;
    }
    return false;
  };

  let obj = {
    cnes: data ? data.cnes : "",
    nome: data ? data.nome_fantasia : "",
    telefone: data ? data.numero_telefone_estabelecimento : "",
    endereco:
      data ? `${data.endereco_estabelecimento}, Nº ${data.numero_estabelecimento} 
        ${data.bairro_estabelecimento}, ${data.cidade_estabelecimento} 
        CEP: ${data.codigo_cep_estabelecimento}` :
        "",
    email: data ? data.endereco_email_estabelecimento : "",
  }

  const salvar = () => {
    if (editar()) {
      toast.success("Dados alterados com sucesso");
    } else {
      toast.success("Estabelecimento criado com sucesso");
    }
    navigate('/estabelecimentos');
  };

  const voltar = () => {
    navigate('/estabelecimentos');
  };

  return (
    <Card title={editar() ? "Atualizar Estabelecimento" : "Novo Estabelecimento"}>
      <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-6 md:grid-cols-6 gap-4">
        <div className="row-span-3 col-span-1 sm:cols-span-6 md:cols-span-6 lg:cols-span-6 ml-5 mr-5">
          <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
            <img
              src={ubsImage}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
            <Link
              to="#"
              className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
            >
              <Icon icon="heroicons:pencil-square" />
            </Link>
          </div>
        </div>
        <div className="row-span-2 col-span-5 sm:cols-span-6 md:cols-span-6 ml-5">
          <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
            <InputGroup
              type="text"
              append={<Icon icon="heroicons-outline:search" />}
              placeholder="CNES do Estabelecimento"
              value={obj.cnes}
              label="CNES"
            />
          </div>
          <div className="row-span-2 col-span-2">
            <Textinput
              label="Nome do Estabelecimento"
              type="text"
              value={obj.nome}
              placeholder="Nome do estabelecimento"
              className="mb-3"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 ml-5">
          <InputGroup
            label="Telefone"
            prepend="BR (+55)"
            placeholder="Telefonde da Unidade"
            id="phoneNumber"
            value={obj.telefone}
            options={{ phone: true, phoneRegionCode: "BR" }}
            isMask
          />
        </div>
        <div className="col-span-1 ml-5">
          <InputGroup
            label="email"
            id="email"
            value={obj.email}
            type="text"
            placeholder="E-mail"
            prepend="@"
          />
        </div>
      </div>
      <div>
        <div className="ml-5">
          <Textarea
            label="Endereço"
            type="text"
            placeholder="Endereço do Estabelecimento"
            value={obj.endereco}
            rows="2"
          />
        </div>
        <div className="ml-5">
          <Textarea
            label="Observações"
            type="text"
            rows="2"
            placeholder="Observações"
          />
        </div>
      </div>
      <div className="mt-5">
        <HorarioFuncionamento />
      </div>
      <div class="grid grid-cols-2 mt-5 gap-4">
        <div className="col-span-1 text-left space-x-3 rtl:space-x-reverse justify-items-start">
          <Button
            icon="heroicons-outline:arrow-left"
            text="Voltar"
            className=" btn-dark shadow-base2"
            onClick={voltar}
          />
        </div>
        <div className="col-span-1 text-right space-x-3 rtl:space-x-reverse justify-items-end">
          <Button text={editar() ? "Atualizar" : "Salvar"} className="btn-dark" onClick={salvar} icon="heroicons-outline:save" />
        </div>
      </div>
    </Card >
  );
};

export default EstabelecimentoAddEdit;
