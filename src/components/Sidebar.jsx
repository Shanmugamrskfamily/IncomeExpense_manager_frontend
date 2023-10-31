import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("avatar");
  }, []);
  const storedUserName = localStorage.getItem("userName");
  const handleLogout = () => {
    // Your logout functionality
    localStorage.removeItem("userName");
    localStorage.removeItem("avatar");
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", icon: "home", link: "/dashboard" },
    { title: "Add Income", icon: "cash", link: "/addIncome" },
    { title: "Add Expense", icon: "shopping-cart", link: "/addExpense" },
    { title: "All Incomes", icon: "cash", link: "/allIncomes" },
    { title: "All Expenses", icon: "receipt", link: "/allExpenses" },
    { title: "All Transactions", icon: "list", link: "/allTransactions" },
    {title: storedUserName, icon:'user', link:"/user"},
    { title: "Logout", icon: "logout", action: handleLogout },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-64" : "w-16"
        } bg-gray-800 h-screen p-5 relative duration-300 text-white`}
      >
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-20 h-22 mb-4"
        />

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={item.action || (() => navigate(item.link))}
              className="flex items-center cursor-pointer rounded-md p-2 hover:bg-gray-700 transition duration-200"
            >
              <span className="mr-3">
                <i className={`ri-${item.icon}-line`}></i>
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
