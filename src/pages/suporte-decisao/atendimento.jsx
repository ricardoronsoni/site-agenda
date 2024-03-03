import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import HistoryChart from "@/components/partials/widget/chart/history-chart";
import AccountReceivable from "@/components/partials/widget/chart/account-receivable";
import AccountPayable from "@/components/partials/widget/chart/account-payable";
import CardSlider from "@/components/partials/widget/CardSlider";
import TransactionsTable from "@/components/partials/Table/transactions";
import SelectMonth from "@/components/partials/SelectMonth";
import HomeBredCurbs from "./HomeBredCurbs";

import Mainuser from "@/assets/images/all-img/main-user.png";
const users = [
  {
    name: "Ab",
  },
  {
    name: "Bc",
  },
  {
    name: "Cd",
  },
  {
    name: "Df",
  },
  {
    name: "Ab",
  },
  {
    name: "Sd",
  },
  {
    name: "Sg",
  },
];

const BankingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState('cruzeiro-velho'); 
  const [selectedProfissional, setSelectedProfissional] = useState(''); 
  return (
    <div className="space-y-5">
      <HomeBredCurbs title="Atendimentos" />
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
        <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
          <div className="flex-1">
            {/* Combobox Estabelecimento */}
            <label htmlFor="estabelecimento-select" className="block text-sm font-medium text-gray-700">
              Estabelecimento
            </label>
            <select
              id="estabelecimento-select"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={selectedEstabelecimento}
              onChange={(e) => setSelectedEstabelecimento(e.target.value)}
            >
              <option value="cruzeiro-velho">Cruzeiro velho</option>
              <option value="lago-norte">Lago norte</option>
            </select>

            {/* Combobox Profissional */}
            <label htmlFor="profissional-select" className="block text-sm font-medium text-gray-700 mt-4">
              Profissional
            </label>
            <select
              id="profissional-select"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={selectedProfissional}
              onChange={(e) => setSelectedProfissional(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="aldo-santos">Aldo dos Santos</option>
              <option value="betina-silva">Betina da Silva</option>
              <option value="carlos-silveira">Carlos Silveira</option>
              <option value="danilo-sillos">Danilo Sillos</option>
              <option value="eduardo-siqueira">Eduardo Siqueira</option>
            </select>
          </div>
        </div>

          <GroupChart5 />
        </div>
      </Card>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <div className="space-y-5 bank-table">
            <Card title="Histórico" headerslot={<SelectMonth />}>
              <div className="legend-ring4">
                <HistoryChart xAxisUnit="day" />
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Imunização - Total atendimentos" headerslot={<SelectMonth />}>
          <AccountReceivable />
        </Card>
        <Card title="Farmácia - Total atendimentos" headerslot={<SelectMonth />}>
          <AccountPayable />
        </Card>
      </div>
    </div>
  );
};

export default BankingPage;
