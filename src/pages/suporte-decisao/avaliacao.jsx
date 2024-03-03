import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import ProfitChart from "../../components/partials/widget/chart/profit-chart";
import OrderChart from "../../components/partials/widget/chart/order-chart";
import EarningChart from "../../components/partials/widget/chart/earning-chart";
import SelectMonth from "@/components/partials/SelectMonth";
import Customer from "../../components/partials/widget/customer";
import RecentOrderTable from "../../components/partials/Table/recentOrder-table";
import BasicArea from "../chart/appex-chart/BasicArea";
import VisitorRadar from "../../components/partials/widget/chart/visitor-radar";
import MostSales2 from "../../components/partials/widget/most-sales2";
import Products from "../../components/partials/widget/products";
import HomeBredCurbs from "./HomeBredCurbs";

const Ecommerce = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [selectedProfissional, setSelectedProfissional] = useState('carlos-augusto');

  return (
    <div>
      <HomeBredCurbs title="Profissionais" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <Card className="pb-3">
            <div className="flex flex-col">
              <label htmlFor="profissional-select" className="block text-sm font-medium text-gray-700">
                Profissional
              </label>
              <select
                id="profissional-select"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={selectedProfissional}
                onChange={(e) => setSelectedProfissional(e.target.value)}
              >
                <option value="carlos-augusto">Carlos Augusto</option>
                <option value="maria-jose">Maria José</option>
                <option value="pedro-paulo">Pedro Paulo</option>
              </select>
            </div>
          </Card>
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart height={420} />
            </div>
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Profissionais melhor avaliados" headerslot={<SelectMonth />}>
            <Customer />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Avaliação serviços" headerslot={<SelectMonth />} noborder>
            <RecentOrderTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
