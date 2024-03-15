import { useContext, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiCalendar, GiAlarmClock} from "react-icons/gi";
import { MdSendTimeExtension } from "react-icons/md";
import Modal from "react-modal";
import DoctorList from "../../components/DoctorList/DoctorList";
import dayjs from 'dayjs';
import { ProviderContext } from "../../components/Provider/Provider";
import {
  getUsersByRole,
  getAvailableTimeSlots,
  submitAppointment,
} from "../../utils/EndpointUtils";
import "./Doctor.css";

export default function Doctor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableTimeSlot, setAvailableTimeSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAvailableTimeTab, setShowAvailableTimeTab] = useState(false);
  const { axiosJWT, doctorsLst, setDoctorsLst } = useContext(ProviderContext);
  const userId = sessionStorage.getItem("userId");

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    console.log("selectedDoctor", doctor.id);

    getAvailableTimeSlots(axiosJWT, doctor.id, (times) => {
      setAvailableTimeSlot(times.body);
      console.log("times", times.body);
    });
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
    setAvailableTimeSlot(null);
  };

  const [doctorsLstIsEmpty, setDoctorsLstIsEmpty] = useState("");

  // console.log(doctorsLst);

  useEffect(() => {
    getUsersByRole(axiosJWT, "doctor", setDoctorsLst);
  }, [axiosJWT, setDoctorsLst]);

  useEffect(() => {
    setDoctorsLstIsEmpty(doctorsLst.length === 0);
  });

  const [userType] = useState(sessionStorage.getItem("userType"));

  return (
    <div style={{ marginRight: "50px" }}>
      <h1
        style={{
          color: "#198754",
          fontWeight: "900",
          fontSize: 45,
          marginBottom: 3,
        }}
      >
        Doctors
      </h1>
      <hr className="mt-0 mb-4" />
      <br />
      {!doctorsLstIsEmpty ? (
        <DoctorList
          doctorsLst={doctorsLst}
          openModal={openModal}
          userType={userType}
          // deleteUser={deleteUser}
        />
      ) : (
        <h1
          className="disabled"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2px",
            backgroundColor: "transparent",
            opacity: 0.2,
            color: "green",
          }}
        >
          No doctors are available at the moment.
        </h1>
      )}
      {selectedDoctor && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "800px",
              height: "auto",
              margin: "auto",
              overflowY: "auto",
              overflow: `${showAvailableTimeTab ? "auto" : "hidden"}`,
            },
          }}
        >
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                color="success"
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                onClick={() => setShowAvailableTimeTab(false)}
              >
                Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                onClick={() => setShowAvailableTimeTab(true)}
              >
                Available time
              </button>
            </li>
          </ul>
          <hr className="mt-0 mb-4" />
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <>
                <div className="cotainer-xl px-4 mt-4" />
                <div className="row">
                  <div className="col-xl-4">
                    <div className="card mb-4 mb-xl-0">
                      <div className="card-header">Profile Picture</div>
                      <div className="card-body text-center">
                        <img
                          className="img-account-profile rounded-circle mb-2"
                          src="http://bootdey.com/img/Content/avatar/avatar1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    <div className="card mb-4">
                      <div className="card-header">Account Details</div>
                      <div className="card-body">
                        <form>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                for="inputFirstName"
                              >
                                Name
                              </label>
                              <input
                                className="form-control"
                                id="inputFirstName"
                                type="text"
                                value={
                                  selectedDoctor.firstName +
                                  " " +
                                  selectedDoctor.lastName
                                }
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label
                                className="small mb-1"
                                for="inputFirstName"
                              >
                                Email
                              </label>
                              <input
                                className="form-control"
                                id="inputFirstName"
                                type="text"
                                value={selectedDoctor.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" for="mobile">
                                Phone number
                              </label>
                              <input
                                className="form-control"
                                id="mobile"
                                value={selectedDoctor.mobile}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" for="mobile">
                                Gender
                              </label>
                              <input
                                className="form-control"
                                id="mobile"
                                value={selectedDoctor.gender}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="small mb-1"
                              for="exampleFormControlTextarea1"
                            >
                              Job position
                            </label>
                            <input
                              className="form-control"
                              id="mobile"
                              value={selectedDoctor.role}
                              disabled
                            />
                          </div>
                        </form>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            {availableTimeSlot !== null ? (
              availableTimeSlot.map((time) => (
                <div
                  key={time.id}
                  className="form-check d-flex justify-content-between"
                  style={{
                    backgroundColor: "#DDFFDD",
                    padding: 5,
                    borderRadius: 5,
                    marginBottom: 3,
                  }}
                >
                  <label
                    className="form-check-label"
                    for="flexRadioDefault1"
                    style={{ marginTop: 8, marginLeft: 5 }}
                  >
                    <div className="form-check d-flex justify-content-between" style={{ backgroundColor: "#EEFFEE", padding: 5, borderRadius: 5, marginBottom: 3 }}>
                      <div className="form-check-label" style={{ display: 'flex', alignItems: 'center' }}>
                          <GiCalendar style={{ marginRight: 5, color: "#198754" }} />
                          <span style={{ marginRight: '80px' }}>Start Date: {dayjs(time.startTime).format('M-D-YYYY')}</span>
                      </div>
                      <div>
                      <GiAlarmClock style={{ marginRight: 5, color: "#198754" }} />
                          <span style={{ marginLeft: '' }}></span><span>Start Time: {dayjs(time.startTime).format('h:mm A')}</span>
                      </div>
                    </div>
                      <div className="form-check d-flex justify-content-between" style={{ backgroundColor: "#EEFFEE", padding: 5, borderRadius: 5, marginBottom: 3 }}>
                        <div className="form-check-label" style={{ display: 'flex', alignItems: 'center' }}>
                            <GiCalendar style={{ marginRight: 5, color: "#198754" }} />
                            <span style={{ marginRight: '80px' }}>End Date: {dayjs(time.endTime).format('M-D-YYYY')}</span>
                        </div>
                        <div>
                        <GiAlarmClock style={{ marginRight: 5, color: "#198754" }} />
                            <span style={{ marginRight: '8px' }}></span><span>End Time: {dayjs(time.endTime).format('h:mm A')}</span>
                        </div>
                      </div>
                    </label>
                  <button
                    type="button"
                    onClick={() =>
                      submitAppointment(
                        axiosJWT,
                        userId,
                        time.startTime,
                        selectedDoctor.id,                       
                        closeModal
                      )
                    }
                    className="btn btn-success"
                    style={{ backgroundColor: "#31d186 !important" }}
                  >
                    Send Appointment
                    <MdSendTimeExtension
                      style={{ marginLeft: 5, color: "orange" }}
                    />
                  </button>
                </div>
              ))
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: "2px",
                  backgroundColor: "transparent",
                }}
              >
                There are no available times.
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "5px",
              right: "10px",
              padding: "2px",
              backgroundColor: "transparent",
            }}
          >
            <AiOutlineCloseCircle size={25} color="red" />
          </button>
        </Modal>
      )}
    </div>
  );
}
