import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { ProviderContext } from "../../components/Provider/Provider";
import {
  getProfileDetails,
  updateProfileDetails,
} from "../../utils/EndpointUtils";
import { handleEmailChange, handleMobileChange } from "../../utils/Validation";
import "./UserProfile.css";

function UserProfile() {
  const { axiosJWT } = useContext(ProviderContext);

  const userId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "",
  });

  const endpointURI = "http://localhost:8080/user/id";

  useEffect(() => {
    getProfileDetails(axiosJWT, endpointURI, userId, (userData) => {
      setUser(userData.body);
      setLoading(false);
    });
  }, [axiosJWT, endpointURI, userId]);

  const [errorMobile, setErrorMobile] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  return (
    <div style={{ marginRight: 42, marginTop: 0 }}>
      <h1
        style={{
          color: "#198754",
          fontWeight: "900",
          fontSize: 45,
          marginBottom: 0,
        }}
      >
        Edit Profile
      </h1>
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-header">Account Details</div>
            <div class="card-body">
              <form>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      First Name<span className="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      value={user.firstName}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      Last Name<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      value={user.lastName}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      Age<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="number"
                      value={user.age}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          age: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="category">
                      Gender<span className="text-danger"></span>
                    </label>
                    <select
                      class="form-select"
                      required
                      id="gender"
                      aria-label="Dropdown"
                      value={user.gender || ""} 
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          gender: e.target.value,
                        }))
                      }
                    >
                      <option value="" disabled hidden>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      value={user.email}
                      onChange={(e) =>
                        handleEmailChange(e, setUser, setErrorEmail)
                      }
                    />
                    {errorEmail && <ErrorMessage errMessage={errorEmail} />}
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="mobile">
                      Phone number<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      id="mobile"
                      required
                      value={user.mobile}
                      onChange={(e) =>
                        handleMobileChange(e, setUser, setErrorMobile)
                      }
                    />
                    {errorMobile && <ErrorMessage errMessage={errorMobile} />}
                  </div>
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-12">
                    <label class="small mb-1" for="inputAddress">
                      Address
                    </label>
                    <input
                      class="form-control"
                      id="inputAddress"
                      type="text"
                      value={user.address}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {/* <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="category">
                      User type<span className="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      required
                      id="jType"
                      aria-label="Dropdown"
                      value={user.role}
                      onChange={(e) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          role: e.target.value,
                        }))
                      }
                    >
                      <option value="PATIENT">Patient</option>
                      <option value="DOCTOR">Doctor</option>
                      <option value="TECHNITIAN">Technitian</option>
                    </select>
                  </div>
                </div> */}
                <button
                  class="btn btn-success"
                  type="button"
                  onClick={() => updateProfileDetails(axiosJWT, userId, user)}
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
