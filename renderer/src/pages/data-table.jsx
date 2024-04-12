import CsvButton from "../components/data-table/CsvButton.jsx";
import Table from "../components/data-table/Table.jsx";
import Layout from "./panel-layout.jsx";
import ArduinoControls from "../components/Layout/ArduinoControls";


export default function DataTable() {
  return (<>
    <Layout title={"Home"} aside={<ArduinoControls/>}>
      <div className="w-full">
        <div className="flex justify-end mb-3">
          <CsvButton/>
        </div>
        <Table/>
      </div>
    </Layout>
  </>);
}