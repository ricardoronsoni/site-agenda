import React, { useState, useMemo } from "react";
import { servicosEstabelcimento } from "../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";

import GlobalFilter from "../table/react-tables/GlobalFilter";

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

const ServicosPage = () => {
    const [servicos, setServicos] = useState(servicosEstabelcimento);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Deseja remover este serviço?",
            text: "Ao remover um serviço todas as agendas vinculadas a ele serão removidas também.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Excluir Serviço",
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id);
                Swal.fire("Deletado!", "O serviço e todas as agendas relacionados a ele foram excluídas!", "success");
            }
        });
    };

    const onDelete = (id) => {
        setServicos(servicos.filter((item) => item.id !== id));
    };

    const navigate = useNavigate();
    const actions = [
        {
            name: "Visualizar",
            icon: "heroicons-outline:eye",
            doit: (id) => {
                navigate(`/servicos/visualizar/${id}`);
            },
        },
        {
            name: "editar",
            icon: "heroicons:pencil-square",
            doit: (id) => {
                navigate(`/servicos/editar/${id}`);
            },
        },
        {
            name: "Excluir",
            icon: "heroicons-outline:trash",
            doit: (id) => {
                handleDelete(id);
            },
        },
    ];
    const COLUMNS = [
        {
            Header: "Ordem",
            accessor: "id",
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
            Header: "Categoria",
            accessor: "tipoServico",
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
            Header: "Status",
            accessor: "status",
            Cell: (row) => {
                return (
                    <span className="block w-full">
                        <span
                            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row?.cell?.value === "S"
                                ? "text-success-500 bg-success-500"
                                : ""
                                }
            ${row?.cell?.value === "N"
                                    ? "text-danger-500 bg-danger-500"
                                    : ""
                                }
            
             `}
                        >
                            {row?.cell?.value === "S" ? "Ativo" : "Inativo"}
                        </span>
                    </span>
                );
            },
        },
        {
            Header: "Ações",
            accessor: "action",
            Cell: (row) => {
                return (
                    <div>
                        <Dropdown
                            classMenuItems="right-0 w-[140px] top-[110%] "
                            label={
                                <span className="text-xl text-center block w-full">
                                    <Icon icon="heroicons-outline:dots-vertical" />
                                </span>
                            }
                        >
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {actions.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => item.doit(row?.row?.original?.id)}
                                        className={`
                
                  ${item.name === "delete"
                                                ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                                                : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                            }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                                    >
                                        <span className="text-base">
                                            <Icon icon={item.icon} />
                                        </span>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Dropdown>
                    </div>
                );
            },
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => servicos, [servicos]);

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
                    {/* <Button
                            icon="heroicons-outline:arrow-down-on-square-stack"
                            text="Importar do CNES"
                            className=" btn-dark font-normal btn-sm "
                            iconClass="text-lg"
                            onClick={() => {
                                navigate("/invoice-add");
                            }}
                        /> */}
                    <Button
                        icon="heroicons-outline:plus-sm"
                        text="Adicionar Serviço"
                        className=" btn-dark font-normal btn-sm "
                        iconClass="text-lg"
                        onClick={() => {
                            navigate("/servicos/adicionar");
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
    );
};

export default ServicosPage;