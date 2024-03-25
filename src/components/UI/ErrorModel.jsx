import styles from "./ErrorModel.module.css";
import ReactDOM from "react-dom";


const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm}></div>;
};

const OverlayModel = (props) => {
  return (
    <div className={styles.model}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <footer>
        <button className="btn btn-warning" onClick={props.onConfirm}>
          Okay
        </button>
      </footer>
    </div>
  );
};

const ErrorMessage = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <OverlayModel
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default ErrorMessage;
