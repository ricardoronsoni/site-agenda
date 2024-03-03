import React, { useState, useMemo } from "react";
import { atendimentos } from "@/constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import ModerarTodos from "./common/moderar-todos";

import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";

import GlobalFilter from "../table/react-tables/GlobalFilter";
import ModerarUm from "./common/moderar-individual";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input
                    type="checkbox"
                    ref={resolvedRef}
                    {...rest}
                    className="table-checkbox"
                />
            </>
        );
    }
);

export default function GerenciarAgenda() {
    const COLUMNS = [
        {
            Header: "Id",
            accessor: "id",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Usuário",
            accessor: "usuario",
            Cell: (row) => {
                return (
                    <div>
                        <span className="inline-flex items-center">
                            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                                <img
                                    src={row?.cell?.value.image}
                                    alt=""
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                                {row?.cell?.value.nome}
                            </span>
                        </span>
                    </div>
                );
            },
        },
        {
            Header: "Endereço",
            accessor: "usuario.endereco",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Serviço",
            accessor: "servico",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Profissional",
            accessor: "profissional",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Data e Hora",
            accessor: "datahora",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "status",
            accessor: "status",
            Cell: (row) => {
                return (
                    <span className="block w-full">
                        <span
                            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row?.cell?.value === "Confirmado"
                                ? "text-success-500 bg-success-500"
                                : ""
                                } 
                  ${row?.cell?.value === "Aguarda Confirmação"
                                    ? "text-warning-500 bg-warning-500"
                                    : ""
                                }
                  ${row?.cell?.value === "Não Confirmado"
                                    ? "text-warning-500 bg-warning-500"
                                    : ""
                                }
                  ${row?.cell?.value === "Cancelado"
                                    ? "text-danger-500 bg-danger-500"
                                    : ""
                                }
                  
                   `}
                        >
                            {row?.cell?.value}
                        </span>
                    </span>
                );
            },
        },
        {
            Header: "Ação",
            accessor: "action",
            Cell: (row) => {
                return (
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        <Tooltip content="Gerenciar" placement="top" arrow animation="shift-away">
                            <button className="action-btn" type="button" onClick={handleModerarUm}>
                                <Icon icon="heroicons:pencil" />
                            </button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const [moderarTodos, setModerarTodos] = useState(false);
    const [moderarUm, setModerarUm] = useState(false);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => atendimentos, []);
    const navigate = useNavigate();

    const moderarTodosChange = () => {
        setModerarTodos(!moderarTodos);
    }

    const handleModerarUm = () => {
        setModerarUm(!moderarUm);
    }

    const tableInstance = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div>
            <Card noborder>
                <div className="md:flex pb-6 items-center">
                    <h6 className="flex-1 md:mb-0 mb-3">Serviços Ofertados</h6>
                    <div className="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        <Button
                            icon="heroicons-outline:filter"
                            text="Filtrar"
                            className=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
                            iconClass="text-lg"
                        />
                        <Button
                            icon="heroicons-outline:cog"
                            text="Gerenciar Agendamentos"
                            className=" btn-dark font-normal btn-sm "
                            iconClass="text-lg"
                            onClick={() => {
                                moderarTodosChange();
                            }}
                        />
                        <Button
                            icon="heroicons-outline:plus-sm"
                            text="Novo Agendamento"
                            className=" btn-dark font-normal btn-sm "
                            iconClass="text-lg"
                            onClick={() => {
                                navigate("/agendamento");
                            }}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className=" border-t border-slate-100 dark:border-slate-800">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    )}
                                                    scope="col"
                                                    className=" table-th "
                                                >
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? " 🔽"
                                                                : " 🔼"
                                                            : ""}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()} className="table-td">
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                                Página
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className=" form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: "50px" }}
                                />
                            </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Página {" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    href="#"
                                    aria-current="page"
                                    className={` ${pageIdx === pageIndex
                                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div>
            </Card>
            <ModerarTodos moderarTodos={moderarTodos} setModerarTodos={setModerarTodos} />
            <ModerarUm moderarUm={moderarUm} setModerarUm={setModerarUm} />
        </div>
    );
}