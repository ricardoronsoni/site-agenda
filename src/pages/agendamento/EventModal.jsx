import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import FormGroup from "@/components/ui/FormGroup";

const EventModal = ({
  showModal,
  onClose,
  categories,
  selectedEvent,
  onAdd,
  onEdit,
  event,
  onDelete,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      // Remova a validação para o título do evento
      cata: yup.string().required("Categoria é obrigatório"),
      // Adicione validação para o novo campo de horário se necessário
    })
    .required();

  useEffect(() => {
    if (selectedEvent) {
      setStartDate(selectedEvent.date);
      setEndDate(selectedEvent.date);
    }
    if (event) {
      setStartDate(event.event.start);
      setEndDate(event.event.end);
    }
    reset(event);
  }, [selectedEvent, event]);

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    const updatedEvent = {
      ...event,
      title: data.title,
      start: startDate,
      end: endDate,
      allDay: false,
      time: data.time,
      extendedProps: {
        calendar: data.cata,
      },
    }; // Create the updated todo object
    if (event) {
      onEdit(updatedEvent);
      toast.info("Event Updated Successfully");
    } else {
      onAdd({
        title: data.title,
        start: startDate,
        end: endDate,
        allDay: false,
        extendedProps: {
          calendar: data.cata,
        },
      });
      toast.success("Event Add Successfully");
    }

    onClose();
    reset();
  };

  const handleDelete = (id) => {
    onClose();
    Swal.fire({
      title: "Você está certo?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sim, exclua a agenda!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Excluído!", "O agendamento foi excluído com sucesso.", "success");
      }
    });
  };
  return (
    <div>
      <Modal
        title={event ? "Editar agenda" : "Adicionar agenda"}
        activeModal={showModal}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Select
            label="Agenda"
            options={categories}
            register={register}
            error={errors.cata}
            name="cata"
          />

          <FormGroup label="Data sugerida" id="default-picker" error={errors.startDate}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="text-control py-2 border border-gray-300 rounded-md focus:ring focus:border-blue-300"
                  id="default-picker"
                  placeholder="yyyy, dd M"
                  value={startDate}
                  onChange={(date) => setStartDate(date[0])}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>

          <FormGroup label="Horário" id="time-picker">
            <select
              className="form-select appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring focus:border-blue-300"
              {...register("time")}
            >
              <option value="morning">Manhã - 8 vagas</option>
              <option value="afternoon">Tarde - 3 vagas</option>
            </select>
          </FormGroup>

          <div className="ltr:text-right rtl:text-left  space-x-3">
            {event && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(event?.event.id)}
              >
                Delete
              </button>
            )}
            <button className="btn btn-dark  text-center">
              {event ? "Update" : "Add"} agenda
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventModal;