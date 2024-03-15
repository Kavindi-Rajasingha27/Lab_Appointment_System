import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Modal,
  TextField,
} from "@mui/material";

const Tests = () => {
  const [tests, setTests] = useState([
    {
      id: 1,
      testType: "Blood Test",
      paymentStatus: "Pending",
      appointmentId: "A001",
      price: "Rs 5000",
    },
    {
      id: 2,
      testType: "Urine Test",
      paymentStatus: "Paid",
      appointmentId: "A002",
      price: "Rs 4000",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handlePaymentClick = (id) => {
    const selectedTest = tests.find((test) => test.id === id);
    setSelectedTest(selectedTest);
    setOpenModal(true);
  };

  const handlePaymentConfirm = () => {
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === selectedTest.id ? { ...test, paymentStatus: "Paid" } : test
      )
    );
    setOpenModal(false);
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

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
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
                Appointment ID
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Test type
              </TableCell>
              <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                Price
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
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.appointmentId}</TableCell>
                <TableCell>{test.testType}</TableCell>
                <TableCell>{test.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={
                      test.paymentStatus === "Pending" ? "error" : "success"
                    }
                    disabled={test.paymentStatus === "Paid"}
                  >
                    {test.paymentStatus}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePaymentClick(test.id)}
                    disabled={test.paymentStatus === "Paid"}
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
            value={selectedTest ? selectedTest.price : ""}
            required
            style={{ marginBottom: 10 }}
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
