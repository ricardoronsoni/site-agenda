import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Repeater from "./Repeater";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { cartaServicos, ambienteUbs, profissionais } from "@/constant/optionsSelects";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";
import { useNavigate } from 'react-router-dom';


const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

export default function ServicosView() {
    const [picker, setPicker] = useState(new Date());
    const [checked5, setChecked5] = useState(true);
    const navigate = useNavigate();

    const salvar = () => {
        navigate('/servicos');
    };

    return (
        <div>
            <Card title="Serviço">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                        <div className="lg:col-span-2 col-span-1 text-slate-900 dark:text-slate-300 text-base font-medium">
                            Serviço
                        </div>
                        <Textinput label="Serviço" type="text" placeholder="Descrição do Serviço" />
                        <div>
                            <label htmlFor=" categoria" className="form-label ">
                                Categoria Serviço
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={cartaServicos[0]}
                                // value={cartaServicos.find(dia => dia.value === item.dia)}
                                options={cartaServicos}
                                styles={styles}
                                id="categoria"
                            />
                        </div>

                        <div>
                            <label htmlFor="data-inicio" className=" form-label">
                                Data Inicio
                            </label>

                            <Flatpickr
                                className="form-control py-2"
                                value={picker}
                                onChange={(date) => setPicker(date)}
                                id="data-inicio"
                                options={{
                                    enableTime: false,
                                    dateFormat: "d-m-Y",
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor=" categoria" className="form-label ">
                                Ambiente
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={ambienteUbs[0]}
                                // value={ambienteUbs.find(dia => dia.value === item.dia)}
                                options={ambienteUbs}
                                styles={styles}
                                id="ambiente"
                            />
                        </div>
                        <Checkbox
                            label="Atividade Coletiva"
                            value={checked5}
                            activeClass="ring-primary-500 bg-primary-500"
                            onChange={() => setChecked5(!checked5)}
                        />
                        {!checked5 &&
                            <Textinput
                                label="Duração Média em Minutos"
                                id="time"
                                options={{ time: true, timePattern: ["m"] }}
                                placeholder="MM"
                                isMask
                            />}
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                        <div className="lg:col-span-2 col-span-1 text-slate-900 text-base dark:text-slate-300 font-medium">
                            Profissional
                        </div>

                        <Textinput label="Nome" type="text" placeholder="Nome do Profissional" />
                        <div>
                            <label htmlFor=" categoria" className="form-label ">
                                Ocupação
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={profissionais[0]}
                                // value={profissionais.find(dia => dia.value === item.dia)}
                                options={profissionais}
                                styles={styles}
                                id="ocupacao"
                            />
                        </div>
                        <Textinput label="Telefone de Contato" type="text" placeholder="Informe o telefone de contato do profissional" />
                        <Textinput label="e-mail" type="text" placeholder="e-mail do profissional" />

                        <div className="lg:col-span-2 col-span-1">
                            <Textarea
                                label="Observações"
                                type="email"
                                placeholder="observacao"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>
                <div className="my-6">
                    <Repeater />
                </div>
                <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
                    <Button
                        icon="heroicons-outline:arrow-left"
                        text="Voltar"
                        className=" btn-dark shadow-base2"
                        onClick={salvar}
                    />
                </div>
            </Card>
        </div>
    );
}



