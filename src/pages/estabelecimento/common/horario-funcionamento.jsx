import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Select from "react-select";
import { useForm, useFieldArray } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { dias } from "@/constant/optionsSelects";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const HorarioFuncionamento = () => {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm(
        {
            defaultValues: {
                test: [{ dia: "Segunda-feira", matutinoInicio: "08:00", matutinoFim: "12:00", vespertinoInicio: "14:00", vespertinoFim: "18:00", noturnoInicio: "19:00", noturnoFim: "22:00" }],
            },
        }
    );
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test",
    });
    const index = 1;

    return (
        <div>
            <div className="bg-slate-50 dark:bg-slate-800 -mx-6 px-6 py-6">
                <div className="mb-6 text-slate-600 dark:text-slate-300 text-xs font-medium uppercase">
                    Horário de Funcionamento
                </div>

                <div>
                    <form>
                        {fields.map((item, index) => (
                            <div
                                className="xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 grid-rows-7 grid gap-5 mb-5 last:mb-0"
                                key={index}
                            >
                                <div>
                                    <label htmlFor=" diaSemana" className="form-label ">
                                        Dia
                                    </label>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="select"
                                        defaultValue={dias[0]}
                                        value={dias.find(dia => dia.value === item.dia)}
                                        options={dias}
                                        styles={styles}
                                        id={`dia${index}`}
                                    />
                                </div>

                                <div>
                                    <label className="form-label" id="timepicker">
                                        Matutino (Início)
                                    </label>
                                    <Flatpickr
                                        className="form-control py-2"
                                        value={item.matutinoInicio}
                                        id="timepicker"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                        }}
                                        onChange={(date) => setBasic(date)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label" id="timepicker">
                                        Matutino (Fim)
                                    </label>
                                    <Flatpickr
                                        className="form-control py-2"
                                        value={item.matutinoFim}
                                        id="timepicker"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                        }}
                                        onChange={(date) => setBasic(date)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label" id="timepicker">
                                        Vespertino (Início)
                                    </label>
                                    <Flatpickr
                                        className="form-control py-2"
                                        value={item.vespertinoInicio}
                                        id="timepicker"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                        }}
                                        onChange={(date) => setBasic(date)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label" id="timepicker">
                                        Vespertino (Fim)
                                    </label>
                                    <Flatpickr
                                        className="form-control py-2"
                                        value={item.vespertinoFim}
                                        id="timepicker"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                        }}
                                        onChange={(date) => setBasic(date)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label" id="timepicker">
                                        Noturno (Início)
                                    </label>
                                    <Flatpickr
                                        className="form-control py-2"
                                        value={item.noturnoInicio}
                                        id="timepicker"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true,
                                        }}
                                        onChange={(date) => setBasic(date)}
                                    />
                                </div>

                                <div className="flex justify-between items-end space-x-5">
                                    <div className="flex-1">
                                        <label className="form-label" id="timepicker">
                                            Noturno (Fim)
                                        </label>
                                        <Flatpickr
                                            className="form-control py-2"
                                            value={item.noturnoFim}
                                            id="timepicker"
                                            options={{
                                                enableTime: true,
                                                noCalendar: true,
                                                dateFormat: "H:i",
                                                time_24hr: true,
                                            }}
                                            onChange={(date) => setBasic(date)}
                                        />
                                    </div>
                                    <div className="flex-none relative">
                                        <button
                                            onClick={() => remove(index)}
                                            type="button"
                                            className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                                        >
                                            <Icon icon="heroicons-outline:trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                    <div className="mt-4">
                        <Button
                            text="Add new"
                            icon="heroicons-outline:plus"
                            className="text-slate-600 p-0 dark:text-slate-300"
                            onClick={() => append()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorarioFuncionamento;
