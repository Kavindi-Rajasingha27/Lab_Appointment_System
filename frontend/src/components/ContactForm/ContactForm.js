import emailjs from "@emailjs/browser";
import { Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

const ContactForm = ({ consultant }) => {
  const [data, setData] = useState({
    toName: consultant.name,
    toEmail: consultant.email,
    fromName: sessionStorage.getItem("userName"),
    fromEmail: sessionStorage.getItem("userEmail"),
    subject: "",
    message: "",
  });

  const onNameChange = (event) => {
    setData((previousState) => {
      return { ...previousState, name: event.target.value };
    });
  };

  const onEmailChange = (event) => {
    setData((previousState) => {
      return { ...previousState, email: event.target.value };
    });
  };

  const onSubjectChange = (event) => {
    setData((previousState) => {
      return { ...previousState, subject: event.target.value };
    });
  };

  const onMessageChange = (event) => {
    setData((previousState) => {
      return { ...previousState, message: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

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
        event.target.reset();
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
        event.target.reset();
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        role="form"
        className="php-email-form"
        style={{ backgroundColor: "#00000000" }}
      >
        <div className="row">
          <div className="col-md-6 form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onNameChange}
              required
            />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Your Email"
              value={data.email}
              onChange={onEmailChange}
              required
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            name="subject"
            id="subject"
            placeholder="Subject"
            value={data.subject}
            onChange={onSubjectChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <textarea
            className="form-control"
            name="message"
            rows="5"
            placeholder="Message"
            value={data.message}
            onChange={onMessageChange}
            required
          ></textarea>
        </div>
        <div
          style={{
            position: "absolute",
            marginTop: 5,
            borderRadius: 5,
            right: "0px",
            padding: "2px",
            backgroundColor: "orange",
          }}
        >
          <Button type="submit" style={{ color: "white" }}>
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
