import { AiFillDelete } from "react-icons/ai";
import { deleteAppointment } from "../../../utils/EndpointUtils";

const JsAppointmentTable = ({ appointmentsLst, axiosJWT }) => {

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return isNaN(date) ? "" : date.toISOString().split("T")[0];
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
              <th scope="col">Date</th>
              <th scope="col">Time</th>
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
                <td>{formatDate(item.dateTime)}</td>
                <td>{formatTime(item.dateTime)}</td>{" "}
                <td style={{ textAlign: "center" }}>
                  <div
                    className={`btn btn-lg ${
                      item.payStatus === "PENDING"
                        ? "btn-secondary"
                        : item.payStatus === "ASSIGNED"
                        ? "btn-primary"
                        : item.payStatus === "PAID"
                        ? "btn-success"
                        : "disabled"
                    }`}
                    style={{
                      borderRadius: "50px",
                      width: "120px",
                      fontSize: "12px",
                    }}
                  >
                    {item.payStatus === "PENDING"
                      ? "PENDING"
                      : item.payStatus === "PAID"
                      ? "PAID"
                      : item.payStatus === "ASSIGNED"
                      ? "ASSIGNED"
                      : "CANCELLED"}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="flex">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ borderRadius: "50px" }}
                      onClick={() => deleteAppointment(axiosJWT, item.id)}
                      disabled={
                        item.payStatus === "PAID"
                          ? true
                          : item.payStatus === "ASSIGNED"
                          ? true
                          : false
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
    </>
  );
};

export default JsAppointmentTable;
