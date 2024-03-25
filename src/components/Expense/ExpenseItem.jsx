import { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import ExpenseContext from "../../store/expense-context";

const ExpenseItem = (props) => {
  const { deleteExpense } = useContext(ExpenseContext);

  return (
    <tr class="table-secondary">
      <th scope="row">{" "} {props.category}</th>
      <td>{" "} {props.description}</td>
      <td>
      {" "}{props.amount}{"/-"}
      </td>
      <td>{props.date}</td>
      <td>
        <button
          className="btn btn-dark"
          onClick={() => deleteExpense(props.expense)}
        >
          <MdOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
