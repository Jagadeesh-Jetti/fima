import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetSavingsData } from "../../utils/actions";
import "../Savings/savings.css";

export const Savings = () => {
  const savings = useSelector((state) => state.savings);
  const dispatch = useDispatch();

  const [sortByAmount, setSortByAmount] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = savings.reduce(
    (acc, saving) =>
      acc.includes(saving.category) ? acc : [...acc, saving.category],
    []
  );

  const totalSavings = savings?.reduce((acc, cur) => cur.amount + acc, 0);

  const handleCheckboxChange = () => {
    setSortByAmount((prevValue) => !prevValue);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredSavings = selectedCategory
    ? savings.filter((expense) => expense.category === selectedCategory)
    : savings;

  const sortedSavings = sortByAmount
    ? [...filteredSavings].sort((a, b) => b.amount - a.amount)
    : filteredSavings;

  useEffect(() => {
    dispatch(GetSavingsData());
  }, [dispatch]);

  return (
    <div className="global-div">
      {savings.length === 0 ? (
        <p className="no-data-message"> Loadingg.... </p>
      ) : (
        <>
          <h3 className="page-heading"> Savings </h3>

          <div className="filter-div">
            <p className="filter-title"> Filters </p>
            <p className="total"> Total Savings: ₹ {totalSavings} </p>
            <div className="filters_line_div">
              <label className="filter-label">
                <span className="bold-text">Sort by Amount </span>
                <input
                  type="checkbox"
                  checked={sortByAmount}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                />
              </label>

              <label className="filter-label">
                <span className="bold-text">Filter by Category:</span>
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value=""> All Categories</option>
                  {uniqueCategories.map((saving) => (
                    <option key={saving} value={saving}>
                      {saving}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className>
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
                {sortedSavings.map((saving) => (
                  <tr key={saving._id}>
                    <td> {saving.description} </td>
                    <td> {saving.category} </td>
                    <td>
                      {" "}
                      {new Date(saving.createdAt).toLocaleDateString(
                        "en-GB"
                      )}{" "}
                    </td>
                    <td> {saving.amount} </td>
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
