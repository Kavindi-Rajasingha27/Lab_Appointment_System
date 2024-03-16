import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../../../components/Provider/Provider";
import {
  completeAppointment,
  createReport,
  getAllTestTypes,
  getAppointmentsForDoctor,
  getUsersByRole,
} from "../../../utils/EndpointUtils";
import Modal from "react-modal";

function DoctorAppointments() {
  const { axiosJWT } = useContext(ProviderContext);

  const [loading, setLoading] = useState(true);

  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [allTestTypes, setAllTestTypes] = useState([]);
  const [allTechnicians, setAllTechnicians] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState({
    doctorId: "",
    patientId: "",
    technicianId: "",
    appointmentId: "",
    testType: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const openModal = (appointment) => {
    selectedAppointment.doctorId = appointment.doctorId;
    selectedAppointment.patientId = appointment.patientId;
    selectedAppointment.appointmentId = appointment.id;
    selectedAppointment.dateTime = appointment.dateTime;
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  useEffect(() => {
    getAppointmentsForDoctor(axiosJWT, userId)
      .then((response) => {
        setDoctorAppointments(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test types:", error);
        setLoading(false);
      });
    getAllTestTypes(axiosJWT)
      .then((response) => {
        setAllTestTypes(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test types:", error);
        setLoading(false);
      });
    getUsersByRole(axiosJWT, "technician", setAllTechnicians).catch((error) => {
      console.error("Error fetching test types:", error);
      setLoading(false);
    });
  }, [axiosJWT, userId, setAllTechnicians]);

  return (
    <>
      <div style={{ marginRight: 42, marginTop: 0 }}>
        <h1
          style={{
            color: "#198754",
            fontWeight: "900",
            fontSize: 45,
            marginBottom: 0,
          }}
        >
          My Appointments
        </h1>
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-xl-12">
            <div class="card mb-4">
              <div class="card-header">Appointment List</div>
              <div class="card-body">
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Appointment No</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorAppointments
                        .filter(
                          (appointment) => appointment.payStatus === "PENDING"
                        )
                        .map((appointment, index) => (
                          <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>{appointment.id}</td>
                            <td>{formatDate(appointment.dateTime)}</td>
                            <td>{formatTime(appointment.dateTime)}</td>
                            <td>{appointment.payStatus}</td>
                            <td>
                              <button
                                className="btn btn-success mx-1"
                                type="button"
                                onClick={() => openModal(appointment)}
                              >
                                ASSIGN A TEST
                              </button>
                              <button
                                className="btn btn-primary mx-1"
                                type="button"
                                onClick={() =>
                                  completeAppointment(axiosJWT, appointment)
                                }
                              >
                                COMPLETE
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Test Data To The Report"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40%",
            height: "auto",
            margin: "auto",
            position: "relative",
          },
        }}
      >
        <div className="px-5 mt-4">
          <button
            type="button"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "0px",
              right: "10px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            X
          </button>
          <h3 className="mb-4">Assign New Test</h3>
          <form>
          <div>
              <label htmlFor="startTime">Appointment No</label>
              <input
                className="form-control mb-4"
                id="startDate"
                type="text"
                disabled
                value={selectedAppointment.appointmentId}
              />
            </div>
          <div>
              <label htmlFor="startTime">Patient Id</label>
              <input
                className="form-control mb-4"
                id="startDate"
                type="text"
                disabled
                value={selectedAppointment.patientId}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="selectTestType" className="form-label">
                Select Test Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select p-2"
                value={selectedAppointment.testType}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({
                    ...prev,
                    testType: e.target.value,
                  }))
                }
              >
                <option value="">select</option>
                {allTestTypes.map((testType, index) => (
                  <option key={index} value={testType.type}>
                    {testType.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="selectTechnician" className="form-label">
                Select Technician <span className="text-danger">*</span>
              </label>
              <select
                className="form-select p-2"
                value={selectedAppointment.technicianId}
                onChange={(e) =>
                  setSelectedAppointment((prev) => ({
                    ...prev,
                    technicianId: e.target.value,
                  }))
                }
              >
                <option value="">select</option>
                {allTechnicians.map((technician, index) => (
                  <option key={index} value={technician.id}>
                    {technician.firstName} {technician.lastName}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-success mt-4"
              type="button"
              onClick={() => {
                closeModal();
                createReport(axiosJWT, selectedAppointment);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default DoctorAppointments;
