import { Column, Table } from "@tanstack/table-core";
import { Data } from "./ReactTable";

interface FilterProp {
  column: Column<Data, unknown>;
  table: Table<Data>;
}

export function Filter(_props: FilterProp) {
  const { column, table } = _props;
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return typeof firstValue === "number" ? (
    <div className="filter-section">
      <input
        className="filter-section"
        type="number"
        value={(column.getFilterValue() as unknown as string)?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: unknown) => [
            e.target.value,
            (old as unknown as string)?.[1],
          ])
        }
        placeholder={`Min`}
      />
      <input
        className="filter-section"
        type="number"
        value={(column.getFilterValue() as unknown as string)?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: unknown) => [
            (old as unknown as string)?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
      />
    </div>
  ) : (
    <input
      className="filter-section"
      type="text"
      value={(column.getFilterValue() as unknown as string) ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
    />
  );
}
