import React from "react";
import { Link } from "react-router-dom";
import ForgotPass from "./common/forgot-pass";
import useDarkMode from "@/hooks/useDarkMode";
import Icon from "@/components/ui/Icon";

import Logo from "@/assets/images/logo/logo.png";
import bgImage from "@/assets/images/all-img/page-bg.png";
const ForgotPassword = () => {
  const [isDark] = useDarkMode();
  return (
    <div
      className="loginwrapper bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="lg-inner-column">
        <div className="lg:w-2/2 w-full flex flex-col items-center justify-center">
          <div className="auth-box-3">
            <div className="mobile-logo text-center mb-6 lg:hidden block">
              <Link to="/">
                <img
                  src={Logo}
                  alt=""
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="text-center 2xl:mb-10 mb-5">
              <h4 className="font-medium mb-4">Esqueceu sua senha?</h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Solicite uma nova senha.
              </div>
            </div>
            <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
              Informe seu CPF para receber um e-mail com as instruções de redefinição de senha.
            </div>

            <ForgotPass />
            <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm flex items-center">
              <Icon icon="heroicons-outline:chevron-left" />
              <Link
                to="/"
                className="text-slate-900 dark:text-white font-medium hover:underline ml-2"
              >
                Voltar para a tela de login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
