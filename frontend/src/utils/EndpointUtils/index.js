import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";

export const handleSignUp = async (
  e,
  userType,
  name,
  email,
  password,
  navigate
) => {
  e.preventDefault();
  try {
    const endpointURI = "http://localhost:8080/user/add";

    const reqBody = {
      firstName: name,
      email: email,
      password: password,
      role: userType,
    };

    await axios.post(endpointURI, reqBody);

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now registered.",
      showConfirmButton: false,
      timer: 3000,
    });

    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Registration Error! User already exists or server issue. Please try again later.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

export const handleSignIn = async (
  e,
  email,
  password,
  setUser,
  setToken,
  navigate
) => {
  e.preventDefault();

  try {
    const endpointURI = "http://localhost:8080/user/login";

    const res = await axios.post(endpointURI, {
      email: email,
      password: password,
    });

    const { success, msg, body } = res.data;
    setUser({
      user: body.user,
      accessToken: body.token,
    });

    sessionStorage.setItem("userId", body.user.id);
    sessionStorage.setItem("userName", body.user.firstName);
    sessionStorage.setItem("accessToken", body.token);
    sessionStorage.setItem("userType", body.user.role);
    sessionStorage.setItem("userEmail", body.user.email);
    setToken(sessionStorage.getItem("accessToken"));

    Swal.fire({
      position: "center",
      icon: "success",
      text: "Success! You are now logged in.",
      showConfirmButton: false,
      timer: 3000,
    });

    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Account not found. Please verify your credentials and try again.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const logout = (setToken, setUser, navigate) => {
  try {
    sessionStorage.clear();
    setToken(null);
    setUser({
      accessToken: "",
      refreshToken: "",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Logout successful. Have a great day!",
      showConfirmButton: false,
      timer: 5000,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Oops! Something went wrong during the logout process. Please try again.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getAppointments = async (axiosJWT, setAppointmentsLst) => {
  try {
    const res = await axiosJWT.get("http://localhost:8080/appointment/all", {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    setAppointmentsLst(res.data.body);
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while fetching appointments.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const deleteAppointment = async (axiosJWT, id) => {
  try {
    const result = await Swal.fire({
      title: `Are you sure you want to delete the appointment?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosJWT.delete(`http://localhost:8080/appointment/delete/${id}`, {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      window.location.reload(); // Reloading the page might not be the best practice; consider alternatives
      Swal.fire({
        position: "center",
        icon: "success",
        text: `Appointment has been deleted.`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Server Error.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const updateAppointmentState = async (axiosJWT, id, state) => {
  try {
    const result = await Swal.fire({
      title: `Are you sure you want to ${state} the appointment?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${state} it!`,
    });

    if (result.isConfirmed) {
      await axiosJWT.patch(
        `http://localhost:8080/appointments/${id}/status-change`,
        {
          status: `${state}`,
        },
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );
      window.location.reload(); // Reloading the page might not be the best practice; consider alternatives
      Swal.fire({
        position: "center",
        icon: "success",
        text: `Appointment state has been updated.`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Server Error.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getProfileDetails = async (axiosJWT, endpoint, id, setUser) => {
  try {
    const res = await axiosJWT.get(`${endpoint}/${id}`, {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });

    if (res.status >= 200 && res.status < 300) {
      setUser(res.data);
      console.log("Profile Details Response:", res.data);
    } else {
      console.error("Error fetching profile details. Status:", res.status);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Server Error",
        text: `Oops! Something went wrong while fetching profile details. Status: ${res.status}`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.error("Error fetching profile details:", err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: `Oops! Something went wrong while fetching profile details. ${
        err.message || ""
      }`,
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const updateProfileDetails = async (axiosJWT, id, user) => {
  console.log("User object before API call:", user);
  try {
    const res = await axiosJWT.post(
      `http://localhost:8080/user/update`,
      { ...user, id },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        timeout: 5000,
      }
    );
    console.log("User object after API call:", res);

    const { success, body } = res.data;

    if (success) {
      console.log("Update successful:", body);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated",
        text: "Your profile details have been successfully updated.",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      console.error("Invalid user data in the response", body);
    }
  } catch (err) {
    console.error("AxiosError:", err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Update Failed",
      text: "Oops! Something went wrong while updating profile details.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const addAvailableTime = async (
  axiosJWT,
  startTime,
  endTime,
  doctorId
) => {
  console.log("Add Available Time Payload:", startTime, endTime, doctorId);
  try {
    const formattedStartTime = format(startTime, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndTime = format(endTime, "yyyy-MM-dd'T'HH:mm:ss");
    console.log(
      "after Add Available Time Payload:",
      formattedStartTime,
      formattedEndTime,
      doctorId
    );

    await axiosJWT.post(
      `http://localhost:8080/available-time/add`,
      {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        available: true,
        doctorId: doctorId,
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    window.location.reload();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Time Slot Added",
      text: "The available time slot has been successfully added.",
      showConfirmButton: false,
      timer: 3000,
    });

  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while adding available time slot.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const addTestType = async (axiosJWT, testType) => {
  try {
    await axiosJWT.post(
      `http://localhost:8080/testType/add`,
      {
        type: testType.type,
        price: testType.price,
        paramArray: testType.paramArray,
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Test Type Added",
      text: "The test type has been successfully added.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while adding test type.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const deleteTestType = async (axiosJWT, testTypeId) => {
  try {
    await axiosJWT.delete(
      `http://localhost:8080/testType/delete/${testTypeId}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Test Type Deleted",
      text: "The test type has been deleted successfully.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while deleting test type.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getAllTestTypes = async (axiosJWT) => {
  try {
    const res = await axiosJWT.get(`http://localhost:8080/testType/all`, {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return res.data.body.reverse();
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while getting test types.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getReportsForTechnician = async (axiosJWT, technicianId) => {
  try {
    const res = await axiosJWT.get(
      `http://localhost:8080/report/technician/${technicianId}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    return res.data.body.reverse();
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while getting reports.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getReportsForPatient = async (axiosJWT, patientId) => {
  try {
    const res = await axiosJWT.get(
      `http://localhost:8080/report/patient/${patientId}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    return res.data.body.reverse();
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while getting reports.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getAppointmentsForDoctor = async (axiosJWT, doctorId) => {
  try {
    const res = await axiosJWT.get(
      `http://localhost:8080/appointment/doctor/${doctorId}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    return res.data.body.reverse();
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while getting reports.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const createReport = async (axiosJWT, selectedReport) => {
  try {
    await axiosJWT.post(
      `http://localhost:8080/report/generate`,
      {
        doctorId: selectedReport.doctorId,
        patientId: selectedReport.patientId,
        technicianId: selectedReport.technicianId,
        appointmentId: selectedReport.appointmentId,
        testType: selectedReport.testType,
        paramArray: {},
        description: "",
        paymentStatus: "PENDING",
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Report Completed",
      text: "The Test has been successfully assigned.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while assigning test.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const completeAppointment = async (axiosJWT, selectedAppointment) => {
  try {
    await axiosJWT.post(
      `http://localhost:8080/appointment/update`,
      {
        id: selectedAppointment.id,
        patientId: selectedAppointment.patientId,
        doctorId: selectedAppointment.doctorId,
        dateTime: selectedAppointment.dateTime,
        payStatus: "ASSIGNED",
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    window.location.reload();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Report Completed",
      text: "The Appointment has been successfully completed.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while completing appointment.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const completeReport = async (axiosJWT, selectedReport) => {
  try {
    const paramObject = selectedReport.paramArray.reduce((obj, item) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
      return obj;
    }, {});

    await axiosJWT.post(
      `http://localhost:8080/report/update`,
      {
        id: selectedReport.id,
        doctorId: selectedReport.doctorId,
        patientId: selectedReport.patientId,
        technicianId: selectedReport.technicianId,
        appointmentId: selectedReport.appointmentId,
        testType: selectedReport.testType,
        paramArray: paramObject,
        description: selectedReport.description,
        paymentStatus: "COMPLETE",
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    window.location.reload();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Report Completed",
      text: "The Report Test Data has been successfully added.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while adding test data to the report.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const updateReportPaymentStatus = async (axiosJWT, selectedReport) => {
  try {

    await axiosJWT.post(`http://localhost:8080/report/update`, selectedReport, {
      headers: {
        authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    window.location.reload();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Report Completed",
      text: "The Report Test Data has been successfully added.",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while adding test data to the report.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getUsersByRole = async (axiosJWT, userRole, setUsersLst) => {
  try {
    const res = await axiosJWT.get(
      `http://localhost:8080/user/role/${userRole}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (Array.isArray(res.data.body)) {
      setUsersLst(res.data.body.reverse());
    } else {
      console.log("Body is not an array:", res.data.body);
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: `Oops! Something went wrong while fetching ${userRole}.`,
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const getAvailableTimeSlots = async (axiosJWT, id, setAvailableTime) => {
  try {
    const res = await axiosJWT.get(
      `http://localhost:8080/available-time/doctor/${id}`,
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (res.data.length !== 0) setAvailableTime(res.data);
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Server Error",
      text: "Oops! Something went wrong while fetching available time slots.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const updateAvailableTimeSlots = async (
  axiosJWT,
  id,
  startTime,
  endTime
) => {
  console.log("Update Available Time Payload:", id, startTime, endTime);

  try {
    const res = await axiosJWT.put(
      `http://localhost:8080/available-time/update`,
      {
        id: id,
        startTime: startTime,
        endTime: endTime,
        available: true,
      },
      {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        timeout: 5000,
      }
    );
    const { success, body } = res.data;

    if (success) {
      console.log("Update successful:", body);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated",
        text: "Your profile details have been successfully updated.",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      console.error("Invalid user data in the response", body);
    }
  } catch (err) {
    console.error("AxiosError:", err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Update Failed",
      text: "Oops! Something went wrong while updating profile details.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const deleteAvailableTimeSlots = async (axiosJWT, id) => {
  try {
    const result = await Swal.fire({
      title: `Are you sure you want to delete this?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosJWT.delete(
        `http://localhost:8080/available-time/delete/${id}`,
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );
      window.location.reload();
      Swal.fire({
        position: "center",
        icon: "success",
        text: ` Time slot has been deleted.`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Server Error.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const submitAppointment = async (
  axiosJWT,
  id,
  dateTime,
  doctorId,
  closeModal
) => {
  try {
    const result = await Swal.fire({
      title: `Confirm Submission`,
      text: `Are you sure you want to submit the appointment.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      await axiosJWT.post(
        `http://localhost:8080/appointment/add`,
        {
          patientId: id,
          dateTime: dateTime,
          payStatus: "PENDING",
          doctorId: doctorId,
        },
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );
      closeModal();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Appointment Submitted",
        text: "Your appointment has been successfully submitted.",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      text: "An error occurred while submitting the appointment.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};

export const deleteUser = async (axiosJWT, userRole, id, userName) => {
  try {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${userName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosJWT.delete(`http://localhost:8080/${userRole}/${id}`, {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      window.location.reload();
      Swal.fire({
        position: "center",
        icon: "success",
        text: `${userName} has been deleted.`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Server Error.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
};
