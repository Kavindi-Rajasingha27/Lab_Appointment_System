import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { saveAs } from "file-saver";
import React, { useState, useRef } from "react";

function Reports() {
  const [data, setData] = useState([
    { id: 1, testId: "ABC123", testType: "Type A", status: "Complete" },
    { id: 2, testId: "DEF456", testType: "Type B", status: "Incomplete" },
    { id: 3, testId: "GHI789", testType: "Type C", status: "Complete" },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Reference for PDF export
  const pdfRef = useRef();

  // Sample report data
  const sampleReport = {
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    technicianName: "Emily Johnson",
    testType: "Type A",
    description: "This is a sample report description.",
    date: "2024-03-15",
    parameters: "Parameter 1: value, Parameter 2: value",
  };

  const handleOpen = () => {
    setSelectedReport(sampleReport); // Set sample report data when opening modal
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadPDF = () => {
    // Get the element containing the modal content
    const pdfContent = pdfRef.current;

    // Create a new jsPDF instance
    const jsPDF = require("jspdf");
    const doc = new jsPDF();

    // Convert the modal content to PDF
    doc.html(pdfContent, {
      callback: function (pdf) {
        // Save the PDF
        pdf.save("report.pdf");
      },
    });
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
                Test ID
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
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row.testType}</TableCell>
                <TableCell>
                  <Button
                    disabled
                    style={{
                      color: row.status === "Complete" ? "green" : "red",
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          ref={pdfRef} // Reference for PDF export
          sx={{
            position: "absolute",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 8,
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#d3f6e3",
              borderRadius: "8px 8px 0 0",
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6" align="center">
              Report
            </Typography>
          </Box>
          <TextField
            label="Patient Name"
            value={selectedReport?.patientName || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Doctor Name"
            value={selectedReport?.doctorName || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Technician Name"
            value={selectedReport?.technicianName || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Test Type"
            value={selectedReport?.testType || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Description"
            value={selectedReport?.description || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Date"
            value={selectedReport?.date || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <TextField
            label="Parameters"
            value={selectedReport?.parameters || ""}
            fullWidth
            disabled
            sx={{ mb: 2, color: "black" }} // Set color to black
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleDownloadPDF}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Reports;
