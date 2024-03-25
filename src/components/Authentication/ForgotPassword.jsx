import { useRef } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const email = useRef();
  async function resetPassword(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");
    console.log(token);
    let resetEmail = email.current.value;

    let obj = {
      resetEmail,
    };
    try {
      let res = await axios.post("http://localhost:3000/forgot-password", obj, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={resetPassword}>
        <div className="card text-center" style={{ width: "300px;" }}>
          <div className="card-header h5 text-white bg-primary">
            Password Reset
          </div>
          <div className="card-body px-5">
            <p className="card-text py-2">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
            <div className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                ref={email}
              />
              <label className="form-label" for="typeEmail">
                Email input
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset password
            </button>
            <div className="d-flex justify-content-between mt-4">
              <a className="" href="#">
                Login
              </a>
              <a className="" href="#">
                Register
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
