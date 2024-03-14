import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../../../components/Provider/Provider";
import { completeAppointment, createReport, getAllTestTypes, getAppointmentsForDoctor, getUsersByRole } from "../../../utils/EndpointUtils";
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
        getUsersByRole(axiosJWT, "technician", setAllTechnicians)
            .catch((error) => {
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
                                    <ul className="reports-list">
                                        {doctorAppointments
                                            .filter(appointment => appointment.payStatus === 'PAID')
                                            .map((appointment) => (
                                                <li key={appointment.id} className="appointment">
                                                    <strong>({appointment.id}) {appointment.dateTime}</strong> Patient ID: {appointment.patientId}  | Status: PENDING
                                                    <button class="btn btn-success mx-5" type="button"
                                                        onClick={() => openModal(appointment)}>
                                                        ASSIGN A TEST
                                                    </button>
                                                    <button class="btn btn-primary" type="button"
                                                        onClick={() => 
                                                            completeAppointment(axiosJWT, appointment)
                                                        }>
                                                        COMPLETE
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
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
                        width: "30%",
                        height: "52%",
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
                    <h5 className="mb-4">Appoitment Id: {selectedAppointment.appointmentId}</h5>
                    <h5 className="mb-4">Patient Id: {selectedAppointment.patientId}</h5>

                    <form>
                        <div>
                            <div>
                                <label class="small mb-1" for="selectTestType">
                                    Select Test Type    <span className="text-danger">*</span>
                                </label>
                            </div>
                            <div>
                                <select
                                    className="form-controll"
                                    value={selectedAppointment.testType}
                                    onChange={(e) =>
                                        setSelectedAppointment((prev) => ({
                                            ...prev,
                                            testType: e.target.value,
                                        }))}
                                >
                                    <option value="">select</option>
                                    {allTestTypes.map((testType, index) => (
                                        <option key={index} value={testType.type}>{testType.type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label class="small mb-1" for="selectTestType">
                                    Select Technician    <span className="text-danger">*</span>
                                </label>
                            </div>
                            <div>
                                <select
                                    className="form-controll"
                                    value={selectedAppointment.technicianId}
                                    onChange={(e) =>
                                        setSelectedAppointment((prev) => ({
                                            ...prev,
                                            technicianId: e.target.value,
                                        }))}
                                >
                                    <option value="">select</option>
                                    {allTechnicians.map((technician, index) => (
                                        <option key={index} value={technician.id}>{technician.firstName} {technician.lastName}</option>
                                    ))}
                                </select>
                            </div>
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
