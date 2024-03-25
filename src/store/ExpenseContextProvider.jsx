import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";

const ExpenseContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(5);
  const [next, setNext] = useState(false);
  const [previous, setPrevious] = useState(false);

  const addExpenseHandler = (expense) => {
    setItems([...items, expense]);
  };

  const deleteExpenseHandler = (expense) => {
    let filterArr = items.filter((item) => {
      return item._id.toString() != expense._id.toString();
    });
    deleteExpense(expense._id);
    setItems(filterArr);
  };

  const deleteExpense = async (id) => {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getExpenses();
    }
  }, [page]);

  function previousHandler() {
    let updatedPage = page - 1;
    setPage(updatedPage);
  }
  function nextHandler() {
    let updatedPage = page + 1;
    setPage(updatedPage);
  }
  const getExpenses = async () => {
    try {
      let token = localStorage.getItem("token");
      let result = await axios.get(
        `http://localhost:3000/expenses?page=${page}&pageSize=${pageItems}`,
        {
          headers: { Authorization: token },
        }
      );

      setItems(result.data.expenses);
      if (result.data.hasPreviousPage) setPrevious(true);
      if (!result.data.hasPreviousPage) setPrevious(false);
      if (result.data.hasNextPage) setNext(true);
      if (!result.data.hasNextPage) setNext(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        items: items,
        addExpense: addExpenseHandler,
        deleteExpense: deleteExpenseHandler,
        previousHandler: previousHandler,
        nextHandler: nextHandler,
        previous: previous,
        next: next,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
