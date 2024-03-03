import React from "react";
import { Link } from "react-router-dom";
import Social from "./common/social";
import LoginForm from "./common/login-form";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
// image import
import bgImage from "@/assets/images/all-img/page-bg.png";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.png";

const Login = () => {
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
                            <h4 className="font-medium">Agenda SUS</h4>
                            <div className="text-slate-500 dark:text-slate-400 text-base">
                                Realize seu login para agendar um serviço
                            </div>
                        </div>
                        <LoginForm />
                        <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                            <div className=" absolute inline-block  bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                                Ou use sua conta
                            </div>
                        </div>
                        <div className="max-w-[242px] mx-auto mt-8 w-full">
                            <Social />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
