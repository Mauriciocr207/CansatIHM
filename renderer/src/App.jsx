import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import ArduinoDataVisualization from "./pages/arduino-data-visualization";
import DataTable from "./pages/data-table";
import PortProvider from "./context/PortProvider";

function App() {
  return (
    <BrowserRouter>
      <PortProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/arduino-data-visualization"
            element={<ArduinoDataVisualization />}
          />
          <Route path="/data-table" element={<DataTable />} />
        </Routes>
      </PortProvider>
    </BrowserRouter>
  );
}

export default App
