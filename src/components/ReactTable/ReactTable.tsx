import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  FilterFnOption,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./ReactTable.css";
import { useMemo, useState } from "react";
import { IndeterminateCheckbox } from "../IndeterminateCheckbox/IndeterminateCheckbox";
import { Filter } from "./Filter";

declare module "@tanstack/table-core" {
  interface FilterFns {
    filter: FilterFn<unknown>;
  }
}

export type Data = Record<string, unknown>;

type ColumnsDataType<D extends Data> = {
  Header: string;
  accessor: keyof D & string;
};

interface TableProps<D extends Data> {
  data: D[];
  columnsData: ColumnsDataType<D>[];
  filterFn?: FilterFn<D>;
}

const ReactTable = <D extends Data>(_props: TableProps<D>) => {
  const { data, columnsData, filterFn } = _props;

  const columnHelper = createColumnHelper<Data>();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = columnsData.map((item) =>
    columnHelper.accessor(item.accessor, {
      header: item.Header,
    })
  );

  const selectionColumn = useMemo<ColumnDef<Data, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns: [...selectionColumn, ...columns],
    filterFns: {
      filter: filterFn as FilterFn<Data>,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: filterFn as FilterFnOption<Data>,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { getHeaderGroups, getRowModel, getFooterGroups } = table;

  const FilterSection = () => {
    return (
      <>
        {getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) =>
            header.column.getCanFilter() ? (
              <div key={header.id} className="filter-section">
                <p style={{ flex: 1 }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </p>
                <Filter column={header.column} table={table} />
              </div>
            ) : null
          )
        )}
      </>
    );
  };

  return (
    <div className="table-responsive">
      <FilterSection />
      <table className="table paragraph">
        <thead className="table-head sticky-top">
          {getHeaderGroups().map((headerGroup) => (
            <tr className="w-100 t-row" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="body-head" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="ww">
          {getRowModel().rows.map((row) => (
            <tr className="w-100 t-row" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="body-cells" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ReactTable;
