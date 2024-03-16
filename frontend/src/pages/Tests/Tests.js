import emailjs from "@emailjs/browser";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProviderContext } from "../../components/Provider/Provider";
import {
  getAllTestTypes,
  getReportsForPatient,
  updateReportPaymentStatus,
} from "../../utils/EndpointUtils";

const Tests = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const [tests, setTests] = useState([]);
  const [allTestTypes, setAllTestTypes] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getReportsForPatient(axiosJWT, userId)
      .then((response) => {
        setTests(response);
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

  const [openModal, setOpenModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const [reportId, setReportId] = useState();

  const handlePaymentClick = (id) => {
    // setReportId(id);
    const selectedTest = tests.find((test) => test.id === id);
    const selectedReportTest = allTestTypes.filter(test => test.type === selectedTest.testType);
    setSelectedTest(selectedTest);
    setPrice(selectedReportTest[0].price);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //Validations
  const [cardNumber, setCardNumber] = useState("");
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);

  const [cardholderName, setCardholderName] = useState("");
  const [isCardholderNameValid, setIsCardholderNameValid] = useState(true);

  const [cvv, setCvv] = useState("");
  const [isCvvValid, setIsCvvValid] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    const cardNumberRegex = /^[0-9]{16}$/;

    setCardNumber(value);
    setIsCardNumberValid(cardNumberRegex.test(value));
  };

  const handleCardholderNameChange = (event) => {
    const { value } = event.target;
    const cardholderNameRegex = /^[A-Za-z\s\-']+$/;

    setCardholderName(value);
    setIsCardholderNameValid(cardholderNameRegex.test(value));
  };

  const handleCvvChange = (event) => {
    const { value } = event.target;
    const cvvRegex = /^[0-9]{3}$/;

    setCvv(value);
    setIsCvvValid(cvvRegex.test(value));
  };

  const [data, setData] = useState({
    toName: sessionStorage.getItem("userName"),
    toEmail: email,
    fromName: "",
    subject: "Payment Confirmation Email",
    message: `Your Payment is successfully received.`,
  });
  
  const handleEmailChange = (event) => {
    setData({
      ...data,
      toEmail: event.target.value,
      message: `We hope this email finds you well.\n\nWe wanted to inform you that your payment for the ${selectedTest.testType} has been successfully received.\n\nIf you have any questions or concerns, feel free to reach out to us.\n\nThank you,\nLabCare`
    });
    setEmail(event.target.value);
  }; 
  

  const sendEmail = () => {
    console.log(data);
    const SERVICE_ID = "service_6d6h9ds";
    const TEMPLATE_ID = "template_7v4wq3w";
    const PUBLIC_KEY = "6mbl40ndg7KDNdgsv";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Email sent successfully!",
          showConfirmButton: false,
          timer: 3500,
        });
        setData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      (error) => {
        console.log("FAILED...", error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Failed to send email. Please try again later.",
          showConfirmButton: false,
          timer: 3500,
        });
        setData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    );
  };

  const [selectedReport, setSelectedReport] = useState({});

  const handlePaymentConfirm = () => {
    sendEmail();
    setTimeout(() => {
      updateReportPaymentStatus(axiosJWT, selectedReport);
    }, 2000);
    // setTests((prevTests) =>
    //   prevTests.map((test) =>
    //     test.id === selectedTest.id ? { ...test, paymentStatus: "Paid" } : test
    //   )
    // );

    setOpenModal(false);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  //proceed butoon disable/enable
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isCardNumberValid && isCardholderNameValid && isCvvValid);
  }, [isCardNumberValid, isCardholderNameValid, isCvvValid]);

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
          Pending Tests
        </h1>
        <hr className="mt-0 mb-4" />
      </div>

      <TableContainer component={Paper} style={{ borderRadius: 8 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#d4edda" }}>
            <TableRow>
            <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Test ID
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Appointment ID
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Test type
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Payment Status
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.filter(report => report.paymentStatus === 'PENDING').map((test) => (
              <TableRow key={test.id}>
                <TableCell>T00{test.id}</TableCell>
                <TableCell>A00{test.appointmentId}</TableCell>
                <TableCell>{test.testType}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={
                      test.paymentStatus === "Pending" ? "error" : "success"
                    }
                    disabled={test.paymentStatus === "PAID"}
                  >
                    {test.paymentStatus}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setReportId(test.id);
                      setSelectedReport((prevReport) => ({
                        ...prevReport,
                        id: test.id,
                        testType: test.testType,
                        doctorId: test.doctorId,
                        patientId: test.patientId,
                        appointmentId: test.appointmentId,
                        technicianId: test.technicianId,
                        paymentStatus: "PAID"
                    }))
                      handlePaymentClick(test.id);
                    }}
                    disabled={!test.paymentStatus === "PENDING"}
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <div
            style={{
              marginBottom: 10,
              backgroundColor: "#d4edda",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
                marginBottom: 10,
                color: "#198754",
              }}
            >
              Credit Card Details
            </h2>
          </div>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={handleCardNumberChange}
            error={!isCardNumberValid}
            helperText={
              !isCardNumberValid ? "Please enter a valid card number" : ""
            }
            required
            style={{ marginBottom: 10 }}
          />

          <div style={{ display: "flex", marginBottom: 10 }}>
            <TextField
              label="Expiry Date"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
              style={{ marginRight: 10 }}
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              value={cvv}
              onChange={handleCvvChange}
              error={!isCvvValid}
              helperText={
                !isCvvValid ? "Please enter a valid CVV (3 digits)" : ""
              }
              required
            />
          </div>
          <TextField
            label="Cardholder Name"
            variant="outlined"
            fullWidth
            value={cardholderName}
            onChange={handleCardholderNameChange}
            error={!isCardholderNameValid}
            helperText={
              !isCardholderNameValid ? "Please enter a valid name" : ""
            }
            required
            style={{ marginBottom: 10 }}
          />

          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={price ? price : ""}
            required
            style={{ marginBottom: 10 }}
            disabled= {price}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid}
            onBlur={handleEmailBlur}
            helperText={!isEmailValid ? "Please enter a valid email" : ""}
            required
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handlePaymentConfirm}
              disabled={!isFormValid}
            >
              Proceed
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Tests;
