import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar/navbar";
import { Expenses } from "./pages/Expenses/expenses";
import { Homepage } from "./pages/Homepage/homepage";
import { Income } from "./pages/Income/income";
import { Reports } from "./pages/Reports/reports";
import { Savings } from "./pages/Savings/savings";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
