import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useContext(AuthContext);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    emailRef.current.value = "";
    passwordRef.current.value = "";

    let obj = {
      email,
      password,
    };
    // console.log(obj);
    try {
      let res = await axios.post("http://localhost:3000/login", obj);
      localStorage.setItem("token", res.data.token);
      logIn(res.data.token);
      history.replace("/expenses"); //redirect to to login page
      console.log(res.data);
    } catch (error) {
      console.log("Error!", error);
    }
  };
  return (
    <>
      <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="Sample image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={formSubmitHandler}>
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    ref={emailRef}
                  />
                  <label class="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control form-control-lg"
                    placeholder="Enter password"
                    ref={passwordRef}
                  />
                  <label class="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <NavLink to="/auth/forgot-password" class="text-body">
                    Forgot password?
                  </NavLink>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    class="btn btn-secondary "
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    {" Don't have an account?"}
                    <NavLink to="/auth/sign-up" class="link-danger">
                      SignUp
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
