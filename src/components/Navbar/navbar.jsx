import { useNavigate } from "react-router";
import "../Navbar/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar_page">
      <h2 className="title" onClick={() => navigate("/")}>
        Financial Management
      </h2>

      <div className="page_links">
        <h4 onClick={() => navigate("/income")}> Income </h4>
        <h4 onClick={() => navigate("/expenses")}> Expense </h4>
        <h4 onClick={() => navigate("/savings")}> Savings </h4>
        <h4 onClick={() => navigate("/reports")}> Reports </h4>
      </div>
    </div>
  );
};
