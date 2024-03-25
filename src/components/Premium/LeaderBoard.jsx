import { useEffect, useState } from "react";
import LeaderBoardItem from "./LeaderBoardItem";
import axios from "axios";
const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  const getLeaderBoard = async () => {
    try {
      let res = await axios.get("http://localhost:3000/leader-board");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeaderBoard();
  }, []);
  return (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Status</th>
          <th>Total Expenses</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <LeaderBoardItem
            key={user._id}
            name={user.name}
            email={user.email}
            total={user.totalExpense}
            id={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default LeaderBoard;
