import { createContext } from "react";

const defaultContext = {
  items: [],
  addExpense: () => {},
  deleteExpense: () => {},
  previousHandler: () => {},
  nextHandler: () => {},
  next: false,
  previous: false,
};

const ExpenseContext = createContext(defaultContext);

export default ExpenseContext;
