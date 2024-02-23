import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIncomeData } from "../../utils/actions";
import "../Income/income.css";
import { SORT_INCOME } from "../../utils/actionTypes";

export const Income = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income);
  const [sortHtoL, setSortHtoL] = useState(false);
  const [sortLtoH, setSortLtoH] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = income.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);

  const toggleHtoL = () => {
    setSortHtoL(true);
    setSortLtoH(false);
    dispatch({ type: SORT_INCOME, payload: "HTL" });
  };

  const toggleLtoH = () => {
    setSortLtoH(true);
    setSortHtoL(false);
    dispatch({ type: SORT_INCOME, payload: "LTH" });
  };

  const totalIncome = income?.reduce((acc, curr) => curr.amount + acc, 0);

  useEffect(() => {
    dispatch(GetIncomeData());
  }, [dispatch]);

  return (
    <div className="global-div">
      {income?.length === 0 ? (
        <p className="no-data-message"> Loadinggg... </p>
      ) : (
        <>
          <h3 className="page-heading"> Income </h3>
          <p className="total"> Total Income: ₹ {totalIncome} </p>
          <div className="filter-div">
            <div className="filter_format_div">
              <div className="income_sort_div">
                <div className="filter_title">Sort Amount:</div>
                <div className="checkbox_and_label">
                  <input
                    checked={sortHtoL}
                    onChange={toggleHtoL}
                    type="checkbox"
                    name="sort"
                    className="checkbox"
                  />
                  <label className="checkbox-label">High to Low</label>
                </div>

                <div className="checkbox_and_label">
                  <input
                    checked={sortLtoH}
                    onChange={toggleLtoH}
                    type="checkbox"
                    name="sort"
                    className="checkbox"
                  />
                  <label className="checkbox-label">Low to High</label>
                </div>
              </div>

              <div className="filter_format_div">
                <div className="filter_title">Filter By Category:</div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="table-div">
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {income
                  .filter((item) =>
                    selectedCategory ? item.category === selectedCategory : true
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td> {item.description} </td>
                      <td> {item.category} </td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td> ₹ {item.amount} </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
