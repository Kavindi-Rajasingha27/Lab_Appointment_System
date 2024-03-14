import { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ProviderContext } from "../../components/Provider/Provider";
import { deleteUser, getAllUsers } from "../../utils/EndpointUtils";

const JobSeekerList = () => {
  const { axiosJWT } = useContext(ProviderContext);

  const [JobSeekerLst, setJobSeekerLSt] = useState(null);

  useEffect(() => {
    getAllUsers(axiosJWT, "job-seekers", setJobSeekerLSt);
  }, []);

  const [userType] = useState(sessionStorage.getItem("userType"));

  if (userType === "admin") {
    return (
      <div style={{ marginRight: "50px" }}>
        <h1
          style={{
            color: "#198754",
            fontWeight: "900",
            fontSize: 45,
            marginBottom: 3,
          }}
        >
          Job Seekers
        </h1>
        <hr class="mt-0 mb-4" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">JOb seeker ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {JobSeekerLst !== null &&
              JobSeekerLst.map((jSeeker) => (
                <tr key={jSeeker.id}>
                  <th scope="row">{jSeeker.id}</th>
                  <td>{jSeeker.name}</td>
                  <td>{jSeeker.age}</td>
                  <td>{jSeeker.email}</td>
                  <td>{jSeeker.mobile}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="flex">
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ borderRadius: "50px" }}
                        onClick={() =>
                          deleteUser(
                            axiosJWT,
                            "job-seekers",
                            jSeeker.id,
                            jSeeker.name
                          )
                        }
                      >
                        <AiFillDelete
                          style={{ marginBottom: "4px", marginRight: "4px" }}
                        />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default JobSeekerList;
