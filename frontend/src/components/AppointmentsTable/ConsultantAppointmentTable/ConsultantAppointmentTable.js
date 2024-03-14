import { AiFillDelete } from "react-icons/ai";
import { MdCancel, MdIncompleteCircle } from "react-icons/md";
import {
  deleteAppointment,
  updateAppointmentState,
} from "../../../utils/EndpointUtils";

const ConsultantAppointmentTable = ({ appointmentsLst, axiosJWT }) => {
  return (
    <>
      <div style={{ marginRight: "50px" }}>
        <h1
          style={{
            color: "#198754",
            fontWeight: "900",
            fontSize: 45,
            marginBottom: 3,
          }}
        >
          Appointments
        </h1>
        <hr class="mt-0 mb-4" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Appointment No</th>
              <th scope="col">Job Seeker</th>
              <th scope="col">Job Type</th>
              <th scope="col">Date & Time</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Status
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointmentsLst.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.jobSeekerName}</td>
                <td>{item.jobType}</td>
                <td>{item.dateTime}</td>
                <td style={{ textAlign: "center" }}>
                  <div
                    className={`btn btn-lg ${
                      item.status === "complete"
                        ? "btn-secondary disabled"
                        : item.status === "active"
                        ? "btn-primary"
                        : "disabled"
                    }`}
                    style={{
                      borderRadius: "50px",
                      width: "120px",
                      fontSize: "12px",
                      cursor: "default",
                    }}
                  >
                    {item.status === "complete"
                      ? "completed"
                      : item.status === "active"
                      ? "active"
                      : "rejected"}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="flex">
                    <button
                      type="button"
                      className={`btn btn-success ${
                        item.status !== "active" && "disabled"
                      }`}
                      style={{ borderRadius: "50px" }}
                      onClick={() =>
                        updateAppointmentState(axiosJWT, item.id, "complete")
                      }
                    >
                      <MdIncompleteCircle
                        style={{ marginBottom: "4px", marginRight: "4px" }}
                      />
                      Complete
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className={`btn btn-warning ${
                        item.status !== "active" && "disabled"
                      }`}
                      style={{ borderRadius: "50px" }}
                      onClick={() =>
                        updateAppointmentState(axiosJWT, item.id, "reject")
                      }
                    >
                      <MdCancel
                        style={{
                          marginBottom: "4px",
                          marginRight: "4px",
                          color: "white",
                        }}
                      />
                      Reject
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ borderRadius: "50px" }}
                      onClick={() => deleteAppointment(axiosJWT, item.id)}
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
    </>
  );
};

export default ConsultantAppointmentTable;
