import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddEntry } from "../../utils/actions";
import "./homepage.css";

export const Homepage = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    description: "",
    amount: "",
    category: "",
    entryType: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    dispatch(AddEntry(input));
    setInput({
      description: "",
      amount: "",
      category: "",
      entryType: "",
    });
    alert("Data added.");
  };

  return (
    <div className="homepage">
      <h3> Add entries </h3>

      <input
        className="homepage_input"
        type="text"
        name="description"
        placeholder="Description"
        value={input.description}
        onChange={handleInput}
      />
      <input
        className="homepage_input"
        type="text"
        name="amount"
        placeholder="Amount"
        value={input.amount}
        onChange={handleInput}
      />
      <input
        className="homepage_input"
        type="text"
        name="category"
        placeholder="Category"
        value={input.category}
        onChange={handleInput}
      />

      <div className="add-entry">
        <select name="entryType" value={input.entryType} onChange={handleInput}>
          <option> Select Type </option>
          <option value="income"> Income </option>
          <option value="expense"> Expense </option>
          <option value="savings"> Saving </option>
        </select>

        <button onClick={handleAddEntry}> Add entry </button>
      </div>
    </div>
  );
};
