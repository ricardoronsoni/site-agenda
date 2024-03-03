import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

const settings = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <Card>
          <div className="space-y-6">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <div className="flex-none h-8 w-8 rounded-full bg-success-500 text-white flex flex-col items-center justify-center text-lg">
                <Icon icon="heroicons:users" />
              </div>
              <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                Procuradores
              </div>
            </div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">
              Indique um procurador para agendar atendimentos e acompanhar sua agenda de cuidados.
            </div>
            <Link
              to="/procuradores"
              className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
            >
              <span>Indicar Procurador</span> <Icon icon="heroicons:arrow-right" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default settings;
