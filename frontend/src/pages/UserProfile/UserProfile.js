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
        <div class="col-xl-4">
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">
              <Avatar
                alt={user.firstName}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTsu0b1R79ZeinW7a0NNTC_unCuc1-VR4_fW4qOVBQWcDoRgw4pmZnTzysiyB0zGh9Ufo&usqp=CAU"
                style={{ width: "150px", height: "150px", margin: "auto" }}
              />
              <h4 style={{ marginTop: 15 }}>{user.firstName} {user.lastName}</h4>
              {/* <img
                class="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              /> */}

              {/* <div class="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <label class="form-label" for="customFile">
                Upload your image
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                accept="image/png, image/jpeg"
              /> */}
            </div>
          </div>
        </div>
        <div class="col-xl-8">
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
                </div>
                <div class="row gx-3 mb-3">
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
                </div>
                <div class="row gx-3 mb-3">
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
                </div>
                <div class="row gx-3 mb-3">
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
                  <div class="col-md-6">
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
