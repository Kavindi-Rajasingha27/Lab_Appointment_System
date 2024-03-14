import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import MuiDateTimePicker from "../../components/MuiDateTimePicker";
import { ProviderContext } from "../../components/Provider/Provider";
import dayjs from "dayjs";
import {
  getAvailableTimeSlots,
  deleteAvailableTimeSlots,
  updateAvailableTimeSlots,
} from "../../utils/EndpointUtils";

const AvailableTimesTable = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const userId = sessionStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const openModal = (time) => {
    setModalIsOpen(true);
    setSelectedTime(time);

    // Set initial values for date and time fields
    setSelectedStartDate(dayjs(time.startTime));
    setSelectedStartTime(dayjs(time.startTime));
    setSelectedEndDate(dayjs(time.endTime));
    setSelectedEndTime(dayjs(time.endTime));
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

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
  const [selectedStartTime, setSelectedStartTime] = useState(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs());
  const [selectedEndTime, setSelectedEndTime] = useState(dayjs());

  // const [startTime, setStartTime] = useState();
  // const [endTime, setEndTime] = useState();

  const handleStartDateChange = (date) => {
    setSelectedStartDate(dayjs(date));
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(dayjs(time, "HH:mm"));
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(dayjs(date));
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(dayjs(time, "HH:mm"));
  };

  useEffect(() => {
    getAvailableTimeSlots(axiosJWT, userId, (times) => {
      setAvailableTimes(times.body);
      console.log(times.body);
      setLoading(false);
    });
  }, [axiosJWT, userId]);

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
          Available Times
        </h1>
        <hr class="mt-0 mb-4" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Start date</th>
              <th scope="col">Start time</th>
              <th scope="col">End date</th>
              <th scope="col">End time</th>
              <th scope="col">Availability</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {availableTimes.map((time, index) => (
              <tr key={time.id}>
                <th scope="row">{index + 1}</th>
                <td>{formatDate(time.startTime)}</td>
                <td>{formatTime(time.startTime)}</td>
                <td>{formatDate(time.endTime)}</td>
                <td>{formatTime(time.endTime)}</td>
                <td>{time.available ? "Available" : "Not Available"}</td>
                <td style={{ textAlign: "center" }}>
                  <div className="flex">
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{
                        borderRadius: "50px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                      onClick={() => openModal(time)}
                    >
                      <AiFillEdit
                        style={{ marginBottom: "4px", marginRight: "4px" }}
                      />
                      Edit
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="flex">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ borderRadius: "50px" }}
                      onClick={() =>
                        deleteAvailableTimeSlots(axiosJWT, time.id)
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
      <br />
      <br />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Available Time Modal"
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
          <h3 className="mb-4">Edit Available Time</h3>
          <form>
            <div>
              <label htmlFor="startTime">Start Date</label>
              <input
                className="form-control mb-4"
                id="startDate"
                type="date"
                onChange={(e) => handleStartDateChange(e.target.value)}
                value={formatDate(selectedStartDate)}
              />
            </div>
            <div>
              <label htmlFor="startTime">Start Time</label>
              <input
                class="form-control mb-4"
                id="inputFirstName"
                type="time"
                onChange={(e) => handleStartTimeChange(e.target.value)}
                value={formatTime(selectedStartTime)}
              />
            </div>
            <div>
              <label htmlFor="endTime">End Date</label>
              <input
                class="form-control mb-4"
                id="inputFirstName"
                type="date"
                onChange={(e) => handleEndDateChange(e.target.value)}
                value={formatDate(selectedEndDate)}
              />
            </div>
            <div>
              <label htmlFor="endTime">End Time</label>
              <input
                class="form-control mb-4"
                id="inputFirstName"
                type="time"
                onChange={(e) => handleEndTimeChange(e.target.value)}
                value={formatTime(selectedEndTime)}
              />
            </div>
            <button
              className="btn btn-success mt-4"
              type="button"
              onClick={() => {
                const updatedStartTime = selectedStartDate.format("YYYY-MM-DD") + "T" + selectedStartTime.format("HH:mm:ss");
                const updatedEndTime = selectedEndDate.format("YYYY-MM-DD") + "T" + selectedEndTime.format("HH:mm:ss");

                updateAvailableTimeSlots(axiosJWT, selectedTime.id, updatedStartTime, updatedEndTime);
                closeModal();
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AvailableTimesTable;
