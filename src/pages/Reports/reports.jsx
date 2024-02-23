import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetIncomeData, GetExpensesData } from "../../utils/actions";

export const Reports = () => {
  const income = useSelector((state) => state.income);
  const expenses = useSelector((state) => state.expenses);
  const savings = useSelector((state) => state.savings);
  const dispatch = useDispatch();

  const [selectedReport, setSelectedReport] = useState("");
  const [reportData, setReportData] = useState(null);

  const handleReportTypeChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const handleGenerateReport = () => {
    if (selectedReport === "incomeVsExpenses") {
      console.log(income);
      const totalIncome = income.reduce((acc, cur) => cur.amount + acc, 0);
      console.log(totalIncome);
      const totalExpenses = expenses.reduce((acc, cur) => cur.amount + acc, 0);
      const savingsTotal = savings.reduce((acc, cur) => cur.amount + acc, 0);

      const report = { totalIncome, totalExpenses, savings: savingsTotal };
      setReportData(report);
    } else if (selectedReport === "expenseBreakdown") {
      // console.log("Expenses for Breakdown:", expenses);
      // const expenseBreakdown = generateExpenseBreakdown(expenses);
      // console.log("Generated Breakdown:", expenseBreakdown);
      // setReportData(expenseBreakdown);
    }
  };

  useEffect(() => {
    dispatch(GetIncomeData());
    dispatch(GetExpensesData());
  }, [dispatch]);

  return (
    <div className="global-div">
      <h3>Financial Reports</h3>
      <div className="report-options">
        <label>Select Report Type:</label>
        <select value={selectedReport} onChange={handleReportTypeChange}>
          <option value="">Select Report Type</option>
          <option value="incomeVsExpenses">Income vs. Expenses</option>
          <option value="expenseBreakdown">Expense Breakdown</option>
        </select>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      {reportData && (
        <div className="report-results">
          {selectedReport === "incomeVsExpenses" && (
            <>
              <p>
                Total Income:{" "}
                {reportData.totalIncome !== undefined
                  ? reportData.totalIncome
                  : 0}
              </p>
              <p>
                Total Expenses:{" "}
                {reportData.totalExpenses !== undefined
                  ? reportData.totalExpenses
                  : 0}
              </p>
              <p>
                Savings:{" "}
                {reportData.savings !== undefined ? reportData.savings : 0}
              </p>
            </>
          )}

          {/* {selectedReport === "expenseBreakdown" && (
            <>
              <h4>Expense Breakdown:</h4>
              <ul>
                {reportData.map((category) => (
                  <li key={category.category}>
                    {category.category}: {category.totalAmount}
                  </li>
                ))}
              </ul>
            </>
          )} */}
        </div>
      )}
    </div>
  );
};
