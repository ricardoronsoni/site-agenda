import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Agenda from "@/assets/images/svg/agenda.svg";
import MinhaAgenda from "@/assets/images/svg/minhaAgenda.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const criarAgendamento = () => {
    navigate("/agendamento");
  }

  const meusAgendamentos = () => {
    navigate("/agendamento/listar");
  }

  return (
    <div>
      <Card title="Agenda SUS">
        {/* <div>
          Seja bem vindo ao AgendaSUS, selecione um serviço:
        </div> */}
        <div className="grid  grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div
            className={"bg-primary-500 mb-10 mt-7 p-4 relative text-center rounded-2xl text-white"}
          >
            <img src={Agenda} alt="Agenda" className="mx-auto relative -mt-[40px]" width="130px" />
            <div className="max-w-[160px] mx-auto mt-6">
              <div className="widget-title"><h3 className="text-inherit">CRIAR AGENDA</h3><br /></div>
              <div className="text-md font-normal">
                Gostaria de Realizar um agendamento?
              </div>
            </div>
            <div className="mt-6">
              <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block" onClick={criarAgendamento}>
                Criar Agendamento
              </button>
            </div>
          </div>
          <div
            className={"bg-success-500  mb-10 mt-7 p-4 relative text-center rounded-2xl text-white"}
          >
            <img src={Agenda} alt="Agenda" className="mx-auto relative -mt-[40px]" width="130px" />
            <div className="max-w-[160px] mx-auto mt-6">
              <div className="widget-title">
                <h3 className="text-inherit text-center">MINHA AGENDA</h3>
                <br />
              </div>
              <div className="text-md font-normal">
                Gostaria de Realizar um agendamento?
              </div>
            </div>
            <div className="mt-6">
              <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block" onClick={meusAgendamentos}>
                Minha Agenda de Cuidado
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
