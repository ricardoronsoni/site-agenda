import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { dias } from "@/constant/optionsSelects";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const Repeater = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        test: [{ diaSemana: "Segunda-feira", horaInicio: "", horaFim: "", totalAtendimento: "", vagasAgendamento: "" }],
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
          Horários de Atendimento
        </div>

        <div>
          <form>
            {fields.map((item, index) => (
              <div
                className="xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                key={index}
              >
                <div>
                  <label htmlFor=" categoria" className="form-label ">
                    Dia Semana
                  </label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={dias[0]}
                    register={register}
                    name={`test[${index}].diaSemana`}
                    options={dias}
                    styles={styles}
                    id={`diaSemana${index}`}
                  />
                </div>

                <Textinput
                  label="Início"
                  id={`inicio${index}`}
                  options={{ time: true, timePattern: ["h", "m", "s"] }}
                  placeholder="HH:MM:SS"
                  register={register}
                  name={`test[${index}].horaInicio`}
                  isMask
                />

                <Textinput
                  label="Fim"
                  id={`fim${index}`}
                  options={{ time: true, timePattern: ["h", "m", "s"] }}
                  placeholder="HH:MM:SS"
                  register={register}
                  name={`test[${index}].horaFim`}
                  isMask
                />

                <Textinput
                  label="Nº de Atendimentos"
                  type="text"
                  id={`atendimentos${index}`}
                  placeholder="Nº de Atendimentos"
                  register={register}
                  name={`test[${index}].totalAtendimento`}
                />

                <div className="flex justify-between items-end space-x-5">
                  <div className="flex-1">
                    <Textinput
                      label="Nº de Agendamentos"
                      type="text"
                      id={`agendamentos${index}`}
                      placeholder="Nº de Agendamentos"
                      register={register}
                      name={`test[${index}].vagasAgendamento`}
                    />
                  </div>
                  {index > 0 && (
                    <div className="flex-none relative">
                      <button
                        onClick={() => remove(index)}
                        type="button"
                        className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                      >
                        <Icon icon="heroicons-outline:trash" />
                      </button>
                    </div>
                  )}
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

export default Repeater;
