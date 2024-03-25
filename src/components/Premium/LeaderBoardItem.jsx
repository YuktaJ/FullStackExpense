import { FaMedal } from "react-icons/fa6";

const LeaderBoardItem = (props) => {
  return (
    <>
      <tr>
        <td>
          <h4>{props.id}</h4>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="userImage"
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">{props.name}</p>
              <p className="text-muted mb-0">{props.email}</p>
            </div>
          </div>
        </td>
        <td>
          {props.id == 1 && (
            <FaMedal style={{ fontSize: "20px", color: "gold" }} />
          )}
          {props.id == 2 && (
            <FaMedal style={{ fontSize: "20px", color: "silver" }} />
          )}
          {props.id == 3 && (
            <FaMedal style={{ fontSize: "20px", color: "bronze" }} />
          )}
        </td>
        <td>
          <h5>{props.total}{"/-"}</h5>
        </td>
      </tr>
    </>
  );
};
export default LeaderBoardItem;
