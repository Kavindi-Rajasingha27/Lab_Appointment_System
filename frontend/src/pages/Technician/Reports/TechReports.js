import { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../../../components/Provider/Provider";
import { completeReport, getAllTestTypes, getReportsForTechnician } from "../../../utils/EndpointUtils";
import "./TechReports.css";
import Modal from "react-modal";

function TechReports() {
    const { axiosJWT } = useContext(ProviderContext);

    const [loading, setLoading] = useState(true);

    const [paidTestReports, setPaidTestReports] = useState([]);
    const [allTestTypes, setAllTestTypes] = useState([]);
    const [selectedReport, setSelectedReport] = useState({
        id: "",
        doctorId: "",
        patientId: "",
        technicianId: "",
        appointmentId: "",
        description: "",
        testType: "",
        paymentStatus: "COMPLETE",
        paramArray: [],
        params: []
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const userId = sessionStorage.getItem("userId");

    const openModal = (report) => {
        selectedReport.id = report.id;
        selectedReport.doctorId = report.doctorId;
        selectedReport.patientId = report.patientId;
        selectedReport.technicianId = report.technicianId;
        selectedReport.appointmentId = report.appointmentId;
        selectedReport.testType = report.testType;

        setModalIsOpen(true);
        const selectedReportTest = allTestTypes.filter(test => test.type === report.testType);
        selectedReport.params = selectedReportTest[0].paramArray;
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        getReportsForTechnician(axiosJWT, userId)
            .then((response) => {
                setPaidTestReports(response);
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
    }, [axiosJWT]);

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
                    Reports to Complete
                </h1>
                <hr class="mt-0 mb-4" />
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card mb-4">
                            <div class="card-header">Paid Test Reports</div>
                            <div class="card-body">
                                <div>
                                    <ul className="reports-list">
                                        {paidTestReports
                                            .filter(report => report.paymentStatus === 'PAID')
                                            .map((report) => (
                                                <li key={report.id} className="report">
                                                    <strong>({report.id}) {report.testType}</strong> | Appointment ID: {report.appointmentId}  | Patient ID: {report.patientId}  | Payment Status: {report.paymentStatus}
                                                    <button class="btn btn-success mx-5" type="button"
                                                        onClick={() => openModal(report)}>
                                                        Enter Test Data
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
                        height: "85%",
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
                            top: "10px",
                            right: "10px",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                        }}
                    >
                        X
                    </button>
                    <h3 className="mb-4">Report Id: {selectedReport.id}</h3>
                    <form>
                        <div>
                            <label class="small mb-1" for="inputFirstName">
                                Description<span className="text-danger">*</span>
                            </label>
                            <input
                                className="form-control mb-4"
                                id="description"
                                type="text"
                                onChange={(e) =>
                                    setSelectedReport((prevReport) => ({
                                        ...prevReport,
                                        description: e.target.value,
                                        paymentStatus: "COMPLETED"
                                    }))}
                                value={selectedReport.description}
                            />
                        </div>
                        {selectedReport.params.map((param, index) => (
                            <div key={index} className="mb-2">
                                <label class="small mb-1" for="inputFirstName" key={index}>
                                    {param}<span className="text-danger">*</span>
                                </label>
                                <input
                                    key={index}
                                    className="form-control mb-4"
                                    type="text"
                                    onChange={(e) => {
                                        const updatedParamArray = [...selectedReport.paramArray];
                                        updatedParamArray[index] = { ...updatedParamArray[index], [param]: e.target.value };
                                        setSelectedReport(prevState => ({ ...prevState, paramArray: updatedParamArray }));
                                    }}
                                >
                                </input>
                            </div>
                        ))}

                        <button
                            className="btn btn-success mt-4"
                            type="button"
                            onClick={() => {
                                closeModal();
                                completeReport(axiosJWT, selectedReport);
                            }}
                        >
                            Complete Report
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default TechReports;
