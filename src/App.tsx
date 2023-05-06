import * as React from "react";
// import "./App.css";
import { valuationColumn, valuationData } from "./data";
import { ReactTable } from "./components";

export default function App() {
  const [data, setData] = React.useState(() => [...valuationData]);

  return (
    <div className="p-2">
      <ReactTable data={data} columnsData={valuationColumn} />
    </div>
  );
}
