import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { ProviderContext } from "../../components/Provider/Provider";
import React, { useState, useEffect, useContext } from "react";
import { getReportsForPatient } from "../../utils/EndpointUtils";
import Modal from "react-modal";
import html2pdf from "html2pdf.js";

function Reports() {
  const { axiosJWT } = useContext(ProviderContext);
  const [data, setData] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");

  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  useEffect(() => {
    getReportsForPatient(axiosJWT, userId)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching test types:", error);
        setLoading(false);
      });
  }, [axiosJWT]);

  const openModal = async (report) => {
    try {
      setSelectedReport({
        id: report.id,
        doctorId: report.doctorId,
        patientId: report.patientId,
        technicianId: report.technicianId,
        appointmentId: report.appointmentId,
        description: report.description,
        testType: report.testType,
        paramArray: report.paramArray
      });
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDownloadPDF = () => {
    const modalContent = document.querySelector('.print');

    html2pdf()
      .from(modalContent)
      .save(`${selectedReport.testType}_Report.pdf`);
  };

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
          Previous Reports
        </h1>
        <hr className="mt-0 mb-4" />
      </div>
      <TableContainer component={Paper} style={{ borderRadius: 8 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#d3f6e3" }}>
            <TableRow>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                REPORT ID
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                APPOINTMENT ID
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Test Type
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter(report => report.paymentStatus === 'COMPLETE').map((row) => (
              <TableRow key={row.id}>
                <TableCell>R00{row.id}</TableCell>
                <TableCell>A00{row.appointmentId}</TableCell>
                <TableCell>{row.testType}</TableCell>
                <TableCell>
                  <Button
                    disabled
                    style={{
                      color: row.paymentStatus === "COMPLETE" ? "green" : "red",
                    }}
                  >
                    {row.paymentStatus}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openModal(row)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Test Data To The Report"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            height: "auto",
            maxWidth: "800px",
            maxHeight: "85%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            overflow: "auto",
          },
        }}
      >
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <button
            type="button"
            onClick={closeModal}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            &times;
          </button>
        </div>
        <div className="print">
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: 'green' }}>
            {selectedReport.testType} Report
          </h2>
          <div className="mx-5">
            <div style={{ marginBottom: "20px" }}>
              <p><strong>Patient Name:</strong> {userName}</p>
              <p><strong>Doctor ID:</strong> {selectedReport.doctorId}</p>
              <p><strong>Technician ID:</strong> {selectedReport.technicianId}</p>
              <p><strong>Appointment ID:</strong> {selectedReport.appointmentId}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
            </div>
            <div>
              <h5 className="text-primary">Test Result:</h5>
              <ul className="mx-5">
                {Object.entries(selectedReport.paramArray).map(([param, value]) => (
                  <li key={param}>
                    {param}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className="mx-10"
                variant="contained"
                color="success"
                onClick={handleDownloadPDF}
              >
                DOWNLOAD THE REPORT
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Reports;

