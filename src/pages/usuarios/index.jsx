import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";

// import images
import ProfileImage from "@/assets/images/users/user-5.jpg";
import FormWizard from "./usuario-wizard";

const profile = () => {
    return (
        <div>
            <div className="space-y-5 profile-page">
                <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
                    <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
                    <div className="profile-box flex-none md:text-start text-center">
                        <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                            <div className="flex-none">
                                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                                    <img
                                        src={ProfileImage}
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
                            <div className="flex-1">
                                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                                    Emanuel Arnon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="lg:col-span-12 col-span-12">
                        <FormWizard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default profile;