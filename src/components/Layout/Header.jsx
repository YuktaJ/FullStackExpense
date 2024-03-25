import { IoHomeOutline } from "react-icons/io5";
import { GrLogin } from "react-icons/gr";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { RxDashboard } from "react-icons/rx";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { PiFolderStarBold } from "react-icons/pi";
import { TbUserStar } from "react-icons/tb";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

function Header() {
  const { isLoggedIn, logOut, isPremium } = useContext(AuthContext);
  console.log(isLoggedIn, isPremium, "dekhoooo");
  const location = useLocation();
  return (
    <header>
      <div className="px-3 py-2 text-bg-dark ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              {isLoggedIn && isPremium == true && (
                <li>
                  <p
                    className={"nav-link px-2 text-white"}
                    style={{
                      color: "white",
                      position: "absolute",
                      left: "35px",
                    }}
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <TbUserStar
                        style={{
                          fontSize: "25px",
                          color: "gold",
                          marginRight: "50px",
                        }}
                      />
                    </svg>
                    Premium User
                  </p>
                </li>
              )}
              <li>
                <NavLink
                  to="/home"
                  className={
                    location.pathname === "/home"
                      ? "nav-link px-2 text-secondary"
                      : "nav-link px-2 text-white"
                  }
                >
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <IoHomeOutline
                      style={{ fontSize: "25px", color: "#a5d6ec" }}
                    ></IoHomeOutline>
                  </svg>
                  Home
                </NavLink>
              </li>
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/expenses"
                    className={
                      location.pathname === "/expenses"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <RxDashboard
                        style={{ fontSize: "25px", color: "#6a5acd" }}
                      ></RxDashboard>
                    </svg>
                    Expense
                  </NavLink>
                </li>
              )}
              <li>
                {isPremium == false && isLoggedIn == true && (
                  <NavLink to="/premium" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <BiSolidBadgeCheck
                        style={{ fontSize: "25px", color: "goldenrod" }}
                      ></BiSolidBadgeCheck>
                    </svg>
                    Premium
                  </NavLink>
                )}
              </li>
              {isLoggedIn && isPremium == true && (
                <li>
                  <NavLink
                    to="/leader-board"
                    className={
                      location.pathname === "/leader-board"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <MdOutlineLeaderboard
                        style={{ fontSize: "25px", color: "green" }}
                      />
                    </svg>
                    Leader Board
                  </NavLink>
                </li>
              )}
              {isLoggedIn && isPremium == true && (
                <li>
                  <NavLink
                    to="/files"
                    className={
                      location.pathname === "/files"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <PiFolderStarBold
                        style={{ fontSize: "25px", color: "yellowgreen" }}
                      />
                    </svg>
                    Files
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink
                    to="/auth/login"
                    className={
                      location.pathname === "/auth"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin
                        style={{ fontSize: "25px", color: "green" }}
                      ></GrLogin>
                    </svg>
                    LogIn
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li onClick={() => logOut()}>
                  <NavLink
                    to="/home"
                    className={
                      location.pathname === "/auth"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin
                        style={{ fontSize: "25px", color: "red" }}
                      ></GrLogin>
                    </svg>
                    LogOut
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
