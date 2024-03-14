import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/1.png";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ProviderContext } from "../../components/Provider/Provider";
import { handleSignIn } from "../../utils/EndpointUtils";
import {
  handleLoginRegisterEmailChange,
  handleLoginRegisterPasswordChange,
} from "../../utils/Validation";

function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(ProviderContext);

  // const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 ">
      <img
        src={logo}
        style={{
          position: "fixed",
          transform: "rotate(-20deg)",
          bottom: "-50px",
          right: "-55px",
          marginBottom: "-20px",
          borderRadius: "12px",
          width: "550px",
          opacity: ".1",
        }}
        alt="logo"
      />
      <div
        className="50-w py-3 px-5 rounded bg-white border border-primary Larger shadow-lg"
        style={{ zIndex: "10" }}
      >
        <form
          onSubmit={(e) =>
            handleSignIn(e, email, password, setUser, setToken, navigate)
          }
        >
          <div className="text-center">
            <img
              src={logo}
              style={{
                marginBottom: "5px",
                width: "150px",
              }}
              alt="logo"
            />
          </div>
          <h3 className="text-center m-0">Sign In</h3>
          <br />
          <div className="mb-3">
            <label htmlFor="email">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) =>
                handleLoginRegisterEmailChange(e, setEmail, setEmailError)
              }
            />
            {emailError && <ErrorMessage errMessage={emailError} />}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) =>
                handleLoginRegisterPasswordChange(
                  e,
                  setPassword,
                  setPasswordError
                )
              }
            />
            {passwordError && <ErrorMessage errMessage={passwordError} />}
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button
              className={`btn btn-success ${
                (!email || !password) && "disabled"
              }`}
            >
              Sign In
            </button>
          </div>
          <p className="text-center mt-3 ">
            Create new account{" "}
            <Link to="/register" className="ms-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
